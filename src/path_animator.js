/**
 * Animates a point smoothly along a series of provided points that can be unevenly spaced.
 * There is no interpolation of the path. The animated point moves linearly.
 * 
 * The total length of the curve is calculated from the points, and the animation is
 * interpolated from this length to give a constant speed.
 * 
 * It takes an array of points as input and moves a point smoothly from one point to the next 
 * in the sequence, creating an animation effect. 
 * 
 * It does little more than interpolate distance, but this is well suited for outputs from spline
 * calculations that are not evenly spaced on the spline or curve. For instance the 
 * p5 CurvePoints() returns unevenly spaced points which can't directly be used 
 * for smooth animations.
 * 
 * update(delta) should be called in the draw loop to increment the internal interpolation.
 * Read .current_position to get the current interpolated position as an {x, y} object.
 * 
 * The normal of the current point is calculated as the segment normal but also interpolated
 * over three segments providing a smooth normal. 
 
 * Requires p5.Vector for the tangent and normal calculations.
 * 
 * @param {*} [points] Objects with x and y properties.
 * @param {number} [duration] The total amount of frames, or time, for the animation.
 * 
 * @param {boolean} [closed_loop] Optional = false. Carry over the overshoot from the last point to the first for closed curves.
 * @param {boolean} [recalculate_always] Optional = true. Recalculate the lengths of the segments and the total length of the curve. Only necessary if the points have changed.
 * @param {boolean} [adjust_t_on_length_change] Optional = true. Adjust t if the length has changed to keep the animator at the same relative position.
 * @param {boolean} [flip_normals] Flip the normal to the tangent. Default is true, because of cw being the default direction in p5.
 * @param {number} [normal_smoothing] Smoothing of the normal interpolation. 0..1. Default is 1 = smoothing starts at segment midpoint.
 * @param {*} [fill] Optional. Fill color for the point if using the built-in draw(). String or p5.Color.
 * @param {*} [stroke] Optional. Stroke color for the point if using the built-in draw(). String or p5.Color.
 * @param {number} [strokeWeight] Optional. Stroke weight for the point if using the built-in draw()
 *
 * @example
 * //This will complete an animation in 5 seconds and adapt to changes in the curve.
 * //If the curve is made longer, the animation will still take 5 seconds meaning the speed is increased.
 * const points = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 200, y: 200}, {x: 300, y: 200}]
 * const pm = new PointAnimator()
 * pm.set_points_reference(points) // Add a list of points to interpolate between.
 * pm.duration = 5                 // Set a total of 5 seconds for the animation.
 * // Draw loop
 * pm.update(deltaTime/1000)       // Increment by the time in seconds passed since last frame.
 * pm.draw()                       // Optional: Use the built-in debug draw function to draw the point.
 *
 * @example
 * //This will complete an animation in 5 seconds, but keep this speed.
 * //If the curve is made longer, the animation will take longer to complete.
 * const points = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 200, y: 200}, {x: 300, y: 200}]
 * const pm = new PointAnimator()
 * pm.set_points_reference(points) // Add a list of points to interpolate between.
 * let dpf = pm.length / 5         // Calculate distance / second only once based on the initial length.
 * // Draw loop
 * pm.duration = pm.length / dpf   // Adjust the speed to the length new curve.
 * pm.update(deltaTime/1000)       // Increment by the time in seconds passed since last frame.
 * pm.draw()                       // Optional: Use the built-in debug draw function to draw the point.
 *
 * 
 * @example
 * //This will complete an animation in 300 frames and adapt to changes in the curve.
 * const points = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 200, y: 200}, {x: 300, y: 200}]
 * const pm = new PointAnimator()
 * pm.set_points_reference(points) // Add a list of points to interpolate between.
 * pm.duration = 300               // Set a total of 5 seconds for the animation.
 * // Draw loop
 * pm.update()                     // 
 * pm.draw()                       // Optional: Use the built-in debug draw function to draw the point.
 * 
 * @example 
 * // This will just draw normals along the curve.
 * const points = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 200, y: 200}, {x: 300, y: 200}]
 * const pm = new PointAnimator()
 * pm.set_points_reference(points) // Add a list of points to interpolate between.
 * // Draw loop
 * pm.update()                     //
 * pm.draw_normals()               // Draw normals along the curve.
 * 
 * 
 * 
*/
class AnimatePointAlongProvidedPoints {
  /** Objects with x and y properties. */
  points

  /** The total amount of frames, or time, for the animation. */
  duration

  /** Recalculate the lengths of the segments and the total length of the curve. Only necessary if the points have changed. */
  recalculate_always = true

  /** Adjust t if the length has changed to keep the animator at the same relative position. */
  adjust_t_on_length_change = true

  /** Flip the normal to the tangent. Default is true, because of cw being the default direction in p5. */
  flip_normals = true

  /** Sharpening of interpolated normals. 0..1. Default is 0 = smoothing starts at segment midpoint. */
  normal_sharpening = 0

  /** Draw the points for debugging. */
  draw_points = false

  /** Fill color for the point if using the built-in draw() */
  fill

  /** Stroke color for the point if using the built-in draw() */
  stroke

  /** Stroke weight for the point if using the built-in draw() */
  strokeWeight

  //#region Private
  /** Current segment index. */
  #index = 0

  /** The local t value of the current segment 0..1. */
  #t_local = 0

  /** The total length of the curve. */
  #length = 0

  /** The current distance along the curve. 0..length. */
  #current_distance = 0

  /** The current position of the interpolated fictive point. */
  #current_position = { x: 0, y: 0 }

  /** The pre-calculated lengths for each segment. */
  #segment_lengths = []

  /** The pre-calculated accumulated lengths for each point. */
  #accumulated_lengths = []

  #closed_loop
  //#endregion

  /**
   * @param {*} [points] Objects with x and y properties.
   * @param {number} [duration] The total amount of frames, or time, for the animation.
   */
  constructor(points, duration = 300) {
    this.points = points
    this.duration = duration

    this.fill = "yellow"
    this.stroke = "lime"
    this.strokeWeight = 0

    this.#closed_loop = false
  }

  /** True: the curve is open. */
  get is_open() {
    return this.#closed_loop === false
  }

  /** True: the curve is closed. */
  get is_closed() {
    return this.#closed_loop
  }

  set is_closed(value) {
    this.#closed_loop = value
  }

  /** Returns the tangent based on the provided points and the active segment. */
  get tangent() {
    return this.tangent_for_segment(min(this.#index, this.points.length - 2))
  }

  /** Returns a linear interpolated tangent for simple usage. */
  get tangent_interpolated() {
    return this.tangent_interpolated_at_segment(this.#index, this.#t_local)
  }

  /** Returns the normal based on the provided points and the active segment. */
  get normal() {
    if (this.flip_normals) {
      return createVector(this.tangent.y, -this.tangent.x)
    } else {
      return createVector(-this.tangent.y, this.tangent.x)
    }
  }

  /** Returns a linear interpolated normal for simple usage. */
  get normal_interpolated() {
    if (this.flip_normals) {
      return createVector(this.tangent_interpolated.y, -this.tangent_interpolated.x)
    } else {
      return createVector(-this.tangent_interpolated.y, this.tangent_interpolated.x)
    }
  }

  /** The pre-calculated lengths for each segment. */
  get segment_lengths() {
    return this.#segment_lengths
  }

  /** The pre-calculated accumulated lengths for each point. */
  get accumulated_lengths() {
    return this.#accumulated_lengths
  }

  /** The current position of the interpolated fictive point. */
  get current_position() {
    return this.#current_position
  }

  /** The total length of the curve. */
  get length() {
    return this.#length
  }

  /** The local t value of the current segment 0..1. */
  get t_local() {
    return this.#t_local
  }

  /** The relative x-position 0..1 (intended use in easing function) */
  get x_t() {
    return map(
      this.#current_position.x,
      this.points[0].x,
      this.points[this.points.length - 1].x,
      0,
      1,
      false
    )
  }

  /** The relative y-position 0..1 (intended use in easing function) */
  get y_t() {
    return map(
      this.#current_position.y,
      this.points[0].y,
      this.points[this.points.length - 1].y,
      0,
      1,
      false
    )
  }

  /** The current t value of the interpolation 0..1.
   */
  get t() {
    return this.#current_distance / this.#length
  }

  set t(t_global) {
    if (!this.points) {
      throw new TypeError("No points provided.")
    }

    while (t_global < 0) {
      t_global = 1 + t_global
    }

    this.recalculate_lengths()
    this.#set_start_index(t_global % 1)
  }

  /** The current distance along the curve. 0..length. */
  get distance() {
    return this.#current_distance
  }

  set distance(d) {
    if (!this.points) {
      throw new TypeError("No points provided.")
    }

    while (d < 0) {
      d = this.#length + d
    }

    this.recalculate_lengths()
    this.#set_start_index((d / this.#length) % 1)
  }

  /** The current index of the points in the curve. */
  get index() {
    return this.#index
  }

  set index(i) {
    if (!this.points) {
      throw new TypeError("No points provided.")
    }

    while (i < 0) {
      i = this.points.length + i - 1
    }

    this.recalculate_lengths()
    this.#set_start_index((this.#accumulated_lengths[Math.floor(i)] / this.#length) % 1)
  }

  /** References the provided array of points.
   * Recalculate if the amount points are changed.
   * @param {object} points Objects with x and y properties
   */
  set_points_reference(points) {
    this.points = points
    this.recalculate_lengths()
  }

  /** Creates new points for the animation.
   *
   * @param {object} points Objects with x and y properties
   */
  set_points(points) {
    this.points = []
    for (let p of points) {
      this.points.push({
        x: p.x,
        y: p.y,
      })
    }
    this.recalculate_lengths()
  }

  /** Gets various information about the fictive point at a provided distance from the start.
   * This function finds the segment index and the local t for the segment.
   * Relatively slow for large amounts of points.
   *
   * For total_t = 1, the second last point is returned with a local t of 1.
   *
   * @param {number} [total_t] Distance from the start of the curve 0..1. If omitted the current distance is used. t is evenly spaced.
   * @return {object} {index, local_t, distance, fictive_point}
   */
  get_local_info_at(total_t) {
    if (total_t === undefined) {
      total_t = this.t
    }

    let local_t = 0
    let index = 0
    let distance = 0
    let p_fictive = { x: 0, y: 0 }

    if (total_t < 1) {
      // Find the segment info that the distance is located in.
      distance = total_t * this.#length
      while (this.#accumulated_lengths[index] < distance) {
        index += 1
      }
      index = max(0, index - 1)

      if (this.#segment_lengths[index] > 0) {
        local_t = (distance - this.#accumulated_lengths[index]) / this.#segment_lengths[index]
      } else {
        local_t = 0
      }
    } else {
      index = this.points.length - 2
      local_t = 1
      distance = this.#length
    }

    p_fictive = {
      x: lerp(this.points[index].x, this.points[index + 1].x, local_t),
      y: lerp(this.points[index].y, this.points[index + 1].y, local_t),
    }

    return {
      i: index,
      t: local_t,
      d: distance,
      p: p_fictive,
    }
  }

  /** Recalculate the total length of the segments and the accumulated length for each point.
   *
   */
  recalculate_lengths() {
    this.#length = this.#path_length(this.points)

    this.#segment_lengths = []
    this.#accumulated_lengths = [0]
    for (let i = 1; i < this.points.length; i += 1) {
      let d = dist(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y)
      this.#segment_lengths.push(d)
      this.#accumulated_lengths.push(d + this.#accumulated_lengths[i - 1])
    }
  }

  /** Calculate the next position of the point along the curve.
   * @param {number} [delta] Amount of frames or time passed since last call. Optional (default 1).
   */
  update(delta = 1) {
    // Calculate lookups for the segment lengths and accumulated lengths.
    // Recalculate t if the points have changed.
    if (this.recalculate_always) {
      let old_length = this.#length
      this.recalculate_lengths()
      if (old_length !== this.#length && this.adjust_t_on_length_change) {
        // console.info(`Length changed from ${old_length.toFixed(2)} to ${this.#length.toFixed(2)}`)
        this.t = (this.t * this.#length) / old_length
      }
    }

    if (this.duration > 0) {
      let step_size = delta * (this.#length / this.duration)
      this.#current_distance += step_size
    }

    // Determine if we have passed the current segment.
    let next_point_at = this.#accumulated_lengths[this.#index] + this.#segment_lengths[this.#index]
    while (this.#current_distance > next_point_at) {
      this.#index += 1

      if (this.#current_distance > this.#length) {
        if (this.#closed_loop) {
          // Continue the animation from the first point with the overshoot passed on.
          this.#index = 0
          this.#current_distance -= this.#length
        } else {
          // Animation complete. Restart from the last point.
          this.#index = this.points.length - 1
          break
        }
      }

      next_point_at = this.#accumulated_lengths[this.#index] + this.#segment_lengths[this.#index]
    }

    if (this.#current_distance <= this.#length) {
      this.#t_local =
        (this.#current_distance - this.#accumulated_lengths[this.#index]) /
        this.#segment_lengths[this.#index]
    }

    // The second last point is the last to be evaluated (last segment). Start over when reaching the last.
    if (this.#index >= this.points.length - 1) {
      // console.info("reset")
      this.#index = 0
      this.#t_local = 0
      this.#current_distance = 0
    }

    // Interpolate the new current position.
    this.#t_local = max(0, min(1, this.#t_local))
    let p = {
      x: lerp(this.points[this.#index].x, this.points[this.#index + 1].x, this.#t_local),
      y: lerp(this.points[this.#index].y, this.points[this.#index + 1].y, this.#t_local),
    }

    this.#current_position.x = p.x
    this.#current_position.y = p.y
  }

  /** Forward calculation of a normalized tangent by points[i] and points[i+1]
   * For an opened curve there is a warning if the last point is used, since it is not a segment.
   * For a closed curve it is wrapped around.
   */
  tangent_for_segment(point_index) {
    if (this.is_open && point_index === this.points.length - 1) {
      // The last point is not a segment for open curves.
      let p0 = this.points[this.points.length - 2]
      let p1 = this.points[this.points.length - 1]
      let tg = createVector(p1.x - p0.x, p1.y - p0.y).normalize()

      console.warn(
        `For an open curve there is no segment starting at index ${point_index}. Returning the tangent for the last segment: ${tg.x.toFixed(
          2
        )}, ${tg.y.toFixed(2)}`
      )
      return tg
    } else {
      // Wrap the index around the array for intentional(?) overshoot.
      let point_index_original = point_index
      point_index = this.#get_segment_index(point_index)
      if (point_index_original !== point_index && this.is_open) {
        console.warn(`Wrapping index ${point_index_original} to ${point_index}`)
      }

      let point_index_next = point_index + 1
      let point_index_next_original = point_index_next
      if (point_index_next > this.points.length - 1) {
        point_index_next = this.#get_segment_index(point_index_next)
        if (point_index_next_original !== point_index_next && this.is_open) {
          console.warn(`Wrapping next index ${point_index_next_original} to ${point_index_next}`)
        }
      }

      let p0 = this.points[point_index]
      let p1 = this.points[point_index_next]
      return createVector(p1.x - p0.x, p1.y - p0.y).normalize()
    }
  }

  /** Forward calculation of the normal by points[i] and points[i+1]. Normalized. */
  normal_for_segment(point_index) {
    let t = this.tangent_for_segment(point_index)
    if (this.flip_normals) {
      return createVector(t.y, -t.x)
    } else {
      return createVector(-t.y, t.x)
    }
  }

  /** Returns a 3-segment interpolated tangent, centered, for simple usage. Normalized. */
  tangent_interpolated_at_segment(point_index, local_t) {
    let t0, t1, t2

    if (this.is_open) {
      if (point_index === 0) {
        // console.info(
        //   `Interpolation can't start at index: ${point_index} because it uses also the previous point, which is outside the curve.`
        // )
        t0 = this.tangent_for_segment(point_index)
        t1 = t0
        t2 = this.tangent_for_segment(point_index + 1)
      } else if (point_index >= this.points.length - 2) {
        // console.info(
        //   `Interpolation can't start at index: ${point_index} because it uses also the next point, which is outside the curve.`
        // )
        t0 = this.tangent_for_segment(point_index - 1)
        t1 = this.tangent_for_segment(point_index)
        t2 = t1
      } else {
        t0 = this.tangent_for_segment(point_index - 1)
        t1 = this.tangent_for_segment(point_index)
        t2 = this.tangent_for_segment(point_index + 1)
      }
    } else if (this.is_closed) {
      t0 = this.tangent_for_segment(point_index - 1)
      t1 = this.tangent_for_segment(point_index)
      t2 = this.tangent_for_segment(point_index + 1)
    }

    // Smoothing 0%: below 0.5 (midpoint segment) lerp between t0 and t1, above 0.5 lerp between t1 and t2.
    // Smoothing 80%: below 0.1 lerp between t0 and t1, above 0.9 lerp between t1 and t2.
    let k = map(this.normal_sharpening, 0, 1, 0.5, 0)
    let lerp
    if (local_t < k) {
      let f = map(local_t, 0, k, 0.5, 1)
      lerp = p5.Vector.lerp(t0, t1, f).normalize()
    } else if (local_t > 1 - k) {
      let f = map(local_t, 1 - k, 1, 0, 0.5)
      lerp = p5.Vector.lerp(t1, t2, f).normalize()
    } else {
      lerp = t1
    }

    return lerp
  }

  /** Returns a 3-segment interpolated normal, centered, for simple usage. Normalized. */
  normal_interpolated_at_segment(point_index, local_t) {
    let t = this.tangent_interpolated_at_segment(point_index, local_t)
    if (this.flip_normals) {
      return createVector(t.y, -t.x)
    } else {
      return createVector(-t.y, t.x)
    }
  }

  /** Draws an interpolated point starting from points[index]
   * If a camera is used, then translate with the camera offset before calling this function.
   */
  draw() {
    fill(this.fill)
    stroke(this.stroke)
    strokeWeight(this.strokeWeight)
    circle(this.#current_position.x, this.#current_position.y, 10)

    // Draw the points for debugging. Don't draw the last point for a closed curve.
    if (this.draw_points) {
      stroke(this.stroke)
      strokeWeight(1)
      noFill()
      for (let i = 0; i < this.points.length; i += 1) {
        if (!(this.is_closed && i === this.points.length - 1)) {
          let p = this.points[i]
          circle(p.x + 0.5, p.y + 0.5, 7.5)

          if (i < this.points.length - 1) {
            line(p.x + 0.5, p.y + 0.5, this.points[i + 1].x + 0.5, this.points[i + 1].y + 0.5)
          }
        }
      }
    }
  }

  /**
   * Draws normal vectors along the curve.
   * By default it draws one normal centered per segment.
   * Additional normals are interpolated between segments and can either be drawn per segment
   * or spaced out evenly through the whole curve.
   *
   * @param {number} [n_points_per_segment] If > 0 then this number of normals are drawn per segment. Default is 1.
   * @param {number} [n_points] Number of points to draw. Default is 100.
   * @param {number} [size] Size of the normal vector. Default is 100.
   */
  draw_normals(n_points_per_segment = 1, n_points = 10, size = 100) {
    function draw(p, n) {
      line(p.x, p.y, p.x + n.x, p.y + n.y)
    }

    stroke(this.stroke)
    strokeWeight(2)

    if (n_points_per_segment > 0) {
      // Draw a certain number of normals per segment.
      let local_ts = []

      // Create a list of t values to sample the curve, different for even and odd number of points.
      // An even number of points excludes the first and last point of a segment.
      let even = n_points_per_segment % 2 === 0
      if (even) {
        let step = 1 / (n_points_per_segment + 1)
        for (let i = 1; i <= n_points_per_segment; i += 1) {
          local_ts.push(i * step)
        }
      } else {
        if (n_points_per_segment === 1) {
          local_ts.push(0.5)
        } else {
          let step = 1 / (n_points_per_segment - 1)
          for (let i = 0; i < n_points_per_segment; i += 1) {
            local_ts.push(i * step)
          }
        }
      }

      // Iterate each segment and draw the normals for each of the local t values already calculated.
      for (let i = 0; i < this.points.length - 1; i += 1) {
        for (let k = 0; k < local_ts.length; k += 1) {
          let local_t = local_ts[k]

          if (even === false && k === local_ts.length - 1 && k !== 0) {
            // Don't draw the normal of the last point since it is the same as the first point of the next segment.
            continue
          }

          let n = this.normal_interpolated_at_segment(i, local_t).setMag(size)

          let p = {
            x: lerp(this.points[i].x, this.points[i + 1].x, local_t),
            y: lerp(this.points[i].y, this.points[i + 1].y, local_t),
          }

          // Draw the normal
          draw(p, n)
        }
      }
    } else {
      // For a number of evenly spaced normals, sample the curve.
      for (let i = 0; i < n_points; i += 1) {
        // An open curve should draw at the last point too. This means that the points are spread out.
        let t_curve
        if (this.is_open) {
          t_curve = i / (n_points - 1)
        } else {
          t_curve = i / n_points
        }

        let info = this.get_local_info_at(t_curve)

        let n
        if (info.i === this.points.length - 1 && this.is_open) {
          // Can't interpolate the last segment for open curves, so use the raw tangent.
          n = this.normal_for_segment(info.i).setMag(size)
        } else {
          n = this.normal_interpolated_at_segment(info.i, info.t).setMag(size)
        }

        let p = info.p

        // Draw the normal
        draw(p, n)
      }
    }
  }

  /** Sets the start point and interpolation given a provided distance from the start.
   * This function finds the segment index and the local t for the segment.
   * Relatively slow for large amounts of points. Once a start index is set, use the update() function
   *
   * @param {number} t Distance from the start of the curve 0..1
   *
   */
  #set_start_index(t) {
    t = max(0, min(1, t))
    let result = this.get_local_info_at(t)

    this.#index = result.i
    this.#t_local = result.t
    this.#current_distance = result.d
    this.#current_position.x = result.p.x
    this.#current_position.y = result.p.y
  }

  /** Wraps an index around the array. The last point does not start a new segment. */
  #get_segment_index(index) {
    while (index < 0) {
      index += this.points.length - 1
    }
    return index % (this.points.length - 1)
  }

  /** Calculate the length of a path, provided an array of x, y points. */
  #path_length(points) {
    let length = 0
    for (let i = 1; i < points.length; i += 1) {
      length += dist(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y)
    }
    return length
  }
}
