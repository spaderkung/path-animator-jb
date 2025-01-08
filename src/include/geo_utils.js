/** A collection of utility functions for working with geometric shapes and points.
 * @module GeoPointsJB
 * @property {function} scale_points - Scale an array of points in place.
 * @property {function} offset_points - Offset an array of points in place.
 * @property {function} reflect_points_point - Reflects the points inline around a single point.
 * @property {function} reflect_points_line - Refelcts points inline around a line.
 * @property {function} reflect_point - Reflect a single point in place around another point.
 * @property {function} rotate_points - Rotate an array of points in place.
 * @property {function} normalize_points - Normalize the points so that the smallest dimension goes from 0..1 and that both dimensions are offset so their smallest point is at 0.
 * @property {function} get_points_center - Returns the geometric center of the points.
 * @property {function} signed_distance_circle - Returns the signed distance function for a circle in 2D space.
 * @property {function} signed_distance_rect - Returns the signed distance function for a rectangle in 2D space.
 * @property {function} signed_distance_line - Returns the signed distance function for a line segment in 2D space.
 * @property {function} signed_distance_polygon - Returns the signed distance function for a polygon with provided points.
 * @property {function} signed_distance_vector - Returns the signed distance function for a vector in 2D space.
 * @property {function} generate_archimedean_spiral_points - Generates a set of points forming an Archimedean spiral.
 * @property {function} generate_polygon_points - Returns x, y pairs of polygon points.
 * @property {function} generate_arc_points - Returns x, y pairs of points along an arc in a clockwise direction.
 * @property {function} generate_square_with_extra_corner_points - Generates a square with extra points flanking each corner for more local normal.
 * @property {Array<{x: number, y: number}>} SQUARE_POINTS - Points for a square.
 * @property {Array<{x: number, y: number}>} SQUARE_WITH_EXTRA_90_PCT_CORNER_POINTS - Points for a square with extra points flanking each corner.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_5_POINTS - Points for a regular pentagon.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_6_POINTS - Points for a regular hexagon.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_8_POINTS - Points for a regular octagon.
 * @property {Array<{x: number, y: number}>} FOUR_STAR_POINTS - Points for a four-pointed star.
 * @property {Array<{x: number, y: number}>} STAR_5_POINTS - Points for a five-pointed star.
 *
 * @author Jon Bolmstedt
 */
class GeoPointsJB {
  /** Scale an array of points in place.
   * @param {Array<{x: number, y: number}>} points - Array of points to scale
   * @param {number} scale - Scale factor. If an object with x and y properties is provided, the points will be scaled by different factors in the x and y directions.
   * @author Jon Bolmstedt
   */
  static scale_points(points, scale) {
    if (scale.x === undefined) {
      for (let p of points) {
        p.x *= scale
        p.y *= scale
      }
    } else {
      for (let p of points) {
        p.x *= scale.x
        p.y *= scale.y
      }
    }
  }

  /** Offset an array of points in place.
   * @param {Array<{x: number, y: number}>} points - Array of points to offset
   * @param {{x: number, y: number}} offset - Offset to apply
   * */
  static offset_points(points, offset) {
    for (let p of points) {
      p.x += offset.x
      p.y += offset.y
    }
  }

  /** Reflects the points inline around a single point */
  static reflect_points_point(points, ref) {
    for (let p of points) {
      p.x = 2 * ref.x - p.x
      p.y = 2 * ref.y - p.y
    }
  }

  /** Refelcts points inline around a line */
  static reflect_points_line(points, p1, p2) {
    let dx = p2.x - p1.x
    let dy = p2.y - p1.y
    let d = dx * dx + dy * dy
    let a = (dx * dx - dy * dy) / d
    let b = (2 * dx * dy) / d
    let c = -a * p1.x - b * p1.y
    for (let p of points) {
      let x = p.x
      let y = p.y
      p.x = a * x + b * y - (2 * a * c) / (a * a + b * b)
      p.y = b * x - a * y - (2 * b * c) / (a * a + b * b)
    }
  }

  /** Reflect a single point in place around another point.
   * @param {{x: number, y: number}} p - Point to reflect
   * @param {{x: number, y: number}} ref - Point to reflect about
   * */
  static reflect_point(p, ref) {
    p.x = 2 * ref.x - p.x
    p.y = 2 * ref.y - p.y
  }

  /** Rotate an array of points in place.
   * @param {Array<{x: number, y: number}>} points - Array of points to rotate
   * @param {number} angle - Angle in radians to rotate by
   * */
  static rotate_points(points, angle) {
    for (let p of points) {
      let x = p.x
      let y = p.y
      p.x = x * Math.cos(angle) - y * Math.sin(angle)
      p.y = x * Math.sin(angle) + y * Math.cos(angle)
    }
  }

  /** Normalizes a list of x, y points and centers them around the origin
   *
   * @param {Array<{x: number, y: number}>} points - Array of points
   * @returns {Array<{x: number, y: number}>} The normalized and centered points
   */
  static normalize_points(points, origin = true) {
    // Find the min and max values for x and y
    let min_x = points[0].x
    let min_y = points[0].y
    let max_x = points[0].x
    let max_y = points[0].y
    for (let p of points) {
      min_x = Math.min(min_x, p.x)
      min_y = Math.min(min_y, p.y)
      max_x = Math.max(max_x, p.x)
      max_y = Math.max(max_y, p.y)
    }

    let largest_range = Math.max(max_x - min_x, max_y - min_y)

    // Normalize the points
    for (let p of points) {
      p.x /= largest_range
      p.y /= largest_range
    }

    // Calculate the normalized midpoint using the midpoint of the min and max values
    let center_x = (max_x + min_x) / largest_range / 2
    let center_y = (max_y + min_y) / largest_range / 2

    // Center the points around the origin
    if (origin) {
      for (let p of points) {
        p.x -= center_x
        p.y -= center_y
      }
    }
  }

  /** Returns the geometric center of the points (average of all points)
   * @param {Array<{x: number, y: number}>} points - Array of points
   * @returns {{x: number, y: number}} The center of the points
   */
  static get_center(points) {
    let center = { x: 0, y: 0 }
    for (let p of points) {
      center.x += p.x
      center.y += p.y
    }
    center.x /= points.length
    center.y /= points.length
    return center
  }

  /** Center points around a provided center point
   * @param {Array<{x: number, y: number}>} points - Array of points
   * @param {{x: number, y: number}} [center] - The center point to use
   */
  static center_points(points, center) {
    if (center === undefined) {
      throw new Error('Center point must be provided')
    }
    
    let current_center = GeoPointsJB.get_midpoint(points)
    let dx = center.x - current_center.x
    let dy = center.y - current_center.y

    for (let p of points) {
      p.x += dx
      p.y += dy
    }
  }

  /** Returns the midpoint 0.5*(max - min)
   * @param {Array<{x: number, y: number}>} points - Array of points
   */
  static get_midpoint(points) {
    let min_x = points[0].x
    let min_y = points[0].y
    let max_x = points[0].x
    let max_y = points[0].y
    for (let p of points) {
      min_x = Math.min(min_x, p.x)
      min_y = Math.min(min_y, p.y)
      max_x = Math.max(max_x, p.x)
      max_y = Math.max(max_y, p.y)
    }

    return { x: (min_x + max_x) / 2, y: (min_y + max_y) / 2 }
  }

  /** Returns the signed distance function for a circle in 2D space
   * @param {number} x - The x-coordinate of the point
   * @param {number} y - The y-coordinate of the point
   * @param {number} cx - The x-coordinate of the circle center
   * @param {number} cy - The y-coordinate of the circle center
   * @param {number} r - The radius of the circle
   */
  static signed_distance_circle(x, y, cx, cy, r) {
    return Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) - r
  }

  /** Returns the signed distance function for a rectangle in 2D space
   * @param {{x: number, y: number}} p - The coordinate of the point
   * @param {{x: number, y: number}} rect_p1 - First rectangle corner
   * @param {{x: number, y: number}} rect_p2 - Second rectangle corner
   * @returns {number} The signed distance from the point to the rectangle
   */
  static signed_distance_rect(p, rect_p1, rect_p2) {
    let dx = Math.max(rect_p1.x - p.x, 0, p.x - rect_p2.x)
    let dy = Math.max(rect_p1.y - p.y, 0, p.y - rect_p2.y)
    return Math.sqrt(dx * dx + dy * dy)
  }

  /** Returns the signed distance function for a rectangle in 2D space
   * @param {{x: number, y: number}} p - The coordinate of the point
   * @param {{x: number, y: number}} rect_p1 - First rectangle corner
   * @param {{x: number, y: number}} rect_p2 - Second rectangle corner
   * @returns {number} The signed distance from the point to the rectangle
   */
  static signed_distance_rect(p, rect_p1, rect_p2) {
    let dx = Math.max(rect_p1.x - p.x, 0, p.x - rect_p2.x)
    let dy = Math.max(rect_p1.y - p.y, 0, p.y - rect_p2.y)
    let outside_distance = Math.sqrt(dx * dx + dy * dy)

    let inside_dx = Math.max(rect_p1.x - p.x, p.x - rect_p2.x)
    let inside_dy = Math.max(rect_p1.y - p.y, p.y - rect_p2.y)
    let inside_distance = -Math.min(inside_dx, inside_dy)

    return Math.max(outside_distance, inside_distance)
  }

  /** Returns the signed distance function for a line segment in 2D space
   * @param {{x: number, y: number}} p - The coordinate of the point
   * @param {{x: number, y: number}} line_p1 - First line point
   * @param {{x: number, y: number}} line_p2 - Second line point
   * @returns {number} The signed distance from the point to the line segment
   */
  static signed_distance_line(p, line_p1, line_p2) {
    let dx = line_p2.x - line_p1.x
    let dy = line_p2.y - line_p1.y
    let lengthSquared = dx * dx + dy * dy

    if (lengthSquared === 0) {
      // line_p1 and line_p2 are the same point
      return Math.sqrt(
        (p.x - line_p1.x) * (p.x - line_p1.x) + (p.y - line_p1.y) * (p.y - line_p1.y)
      )
    }

    // Project point p onto the line segment
    let t = ((p.x - line_p1.x) * dx + (p.y - line_p1.y) * dy) / lengthSquared
    t = Math.max(0, Math.min(1, t))

    let projection = { x: line_p1.x + t * dx, y: line_p1.y + t * dy }
    return Math.sqrt(
      (p.x - projection.x) * (p.x - projection.x) + (p.y - projection.y) * (p.y - projection.y)
    )
  }

  /** Returns the signed distance function for a polygon with provided points
   * @param {Array<{x: number, y: number}>} points - The points of the polygon
   * @param {{x: number, y: number}} p - The coordinate of the point
   * @returns {number} The signed distance from the point to the polygon
   */
  static signed_distance_polygon(points, p) {
    let min_distance = Number.MAX_VALUE
    for (let i = 0; i < points.length; i++) {
      let next = (i + 1) % points.length
      let distance = this.signed_distance_line(p, points[i], points[next])
      min_distance = Math.min(min_distance, distance)
    }

    // Check if the point is inside the polygon using the winding number algorithm
    let inside = false
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      if (
        points[i].y > p.y !== points[j].y > p.y &&
        p.x <
          ((points[j].x - points[i].x) * (p.y - points[i].y)) / (points[j].y - points[i].y) +
            points[i].x
      ) {
        inside = !inside
      }
    }

    return inside ? -min_distance : min_distance
  }

  /** Returns the signed distance function for a vector in 2D space
   * @param {Array<{x: number, y: number}>} p - The coordinate of the point
   * @param {Array<{x: number, y: number}>} vec_p1 - Vector first defining point
   * @param {Array<{x: number, y: number}>} vec_p2 - Vector second defining point
   * */
  static signed_distance_vector(p, vec_p1, vec_p2) {
    let dx = vec_p2.x - vec_p1.x
    let dy = vec_p2.y - vec_p1.y
    return (
      Math.abs(dy * p.x - dx * p.y + vec_p2.x * vec_p1.y - vec_p2.y * vec_p1.x) /
      Math.sqrt(dx * dx + dy * dy)
    )
  }

  static xxx_generateMandelbrotOutlinePoints(width, height, maxIterations, targetPoints) {
    let points = []
    let count = 0
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = map(x, 0, width, -2.5, 1.5)
        let b = map(y, 0, height, -2, 2)
        let ca = a
        let cb = b
        let n = 0
        while (n < maxIterations) {
          let aa = a * a - b * b
          let bb = 2 * a * b
          a = aa + ca
          b = bb + cb
          if (abs(a + b) > 16) {
            break
          }
          n++
        }
        if (n === maxIterations) {
          points.push({ x: a, y: b })
          count++
          if (count >= targetPoints) {
            return points
          }
        }
      }
    }
    return points
  }

  /** Generates a set of points forming an Archimedean spiral.
   * @param {number} a - The distance from the origin to the first point on the spiral.
   * @param {number} b - The distance between the points on the spiral.
   * @param {number} numPoints - The number of points to generate.
   */
  static generate_archimedean_spiral_points(a = 0.1, b = 0.2, numPoints = 50) {
    let points = []
    for (let i = 0; i < numPoints; i++) {
      let theta = i * (Math.PI / 8) // Adjust the angle increment as needed
      let r = a + b * theta
      let x = r * Math.cos(theta)
      let y = r * Math.sin(theta)
      points.push({ x: x, y: y })
    }
    return points
  }

  /** Returns x, y pairs of polygon points.
   * Angles are normalized as fractions of a full circle (0 to 1, where 1 is a full rotation).
   * The first point is at x = radius, y = 0 (3 o'clock). To get a the point at 12 o'clock,
   * set angle_offset = -1/4 (90 degrees CCW) + 1/n_sides.
   * @param {number} n_sides - Number of sides of the polygon
   * @param {number} [radius=1] - Radius of the polygon (default 1)
   * @param {number} [angle_offset=0] - Angle offset as a fraction of a full circle (default 0)
   * @returns {Array<{x: number, y: number}>} Array of points
   */
  static generate_polygon_points(n_sides, radius = 1, angle_offset = 0) {
    const points = []
    const angle_increment = 1 / n_sides // Fractional angle increment for each vertex

    for (let i = 0; i < n_sides; i++) {
      const angle = (i * angle_increment + angle_offset) * 2 * Math.PI // Convert to radians internally
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      points.push({ x, y })
    }

    return points
  }

  /** Returns x, y pairs of points along an arc in a clockwise direction.
   *
   * Angles are normalized as fractions of a full circle (0 to 1, where 1 is a full rotation).
   * @param {number} num_points - Number of points along the arc
   * @param {number} arc_width - Arc width as a fraction of a full circle (positive for CW, negative for CCW)
   * @param {number} [radius=1] - Radius of the arc. (default 1)
   * @param {number} [angle_offset=0] - Starting angle as a fraction of a full circle (default 0)
   * @returns {Array<{x: number, y: number}>} Array of points
   */
  static generate_arc_points(num_points, arc_width, radius = 1, angle_offset = 0) {
    const points = []
    const angle_increment = (arc_width * 2 * Math.PI) / (num_points - 1) // Angle increment in radians

    for (let i = 0; i < num_points; i++) {
      const angle = angle_offset * 2 * Math.PI + i * angle_increment // Convert offset to radians
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      points.push({ x, y })
    }

    return points
  }

  /** Generates a square with extra points flanking each corner for more local normal
   * @param {number} k - The fraction of the side length to use for the extra points.
   */
  static generate_square_with_extra_corner_points(k = 0.2) {
    return [
      { x: 0, y: 0 },
      { x: k, y: 0 },
      { x: 1 - k, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: k },
      { x: 1, y: 1 - k },
      { x: 1, y: 1 },
      { x: 1 - k, y: 1 },
      { x: k, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 1 - k },
      { x: 0, y: k },
      { x: 0, y: 0 }, // Back again to the start
    ]
  }

  static get SQUARE_POINTS() {
    return [
      { x: -0.5, y: -0.5 },
      { x: 0.5, y: -0.5 },
      { x: 0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: -0.5 }, // Back again, same as first
    ]
  }

  static get SQUARE_WITH_EXTRA_90_PCT_CORNER_POINTS() {
    return [
      { x: -0.5, y: -0.5 },
      { x: -0.4, y: -0.5 },
      { x: 0.4, y: -0.5 },
      { x: 0.5, y: -0.5 },
      { x: 0.5, y: -0.4 },
      { x: 0.5, y: 0.4 },
      { x: 0.5, y: 0.5 },
      { x: 0.4, y: 0.5 },
      { x: -0.4, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: 0.4 },
      { x: -0.5, y: -0.4 },
      { x: -0.5, y: -0.5 }, // Back again to the start
    ]
  }

  static get REGULAR_EDER_5_POINTS() {
    return [
      { x: 0, y: -1 },
      { x: 0.951, y: -0.309 },
      { x: 0.588, y: 0.809 },
      { x: -0.588, y: 0.809 },
      { x: -0.951, y: -0.309 },
      { x: 0, y: -1 }, // Back again to the start
    ]
  }

  static get REGULAR_EDER_6_POINTS() {
    return [
      { x: 0, y: -1 },
      { x: 0.866, y: -0.5 },
      { x: 0.866, y: 0.5 },
      { x: 0, y: 1 },
      { x: -0.866, y: 0.5 },
      { x: -0.866, y: -0.5 },
      { x: 0, y: -1 }, // Back again to the start
    ]
  }

  static get REGULAR_EDER_8_POINTS() {
    return [
      { x: 0, y: -1 },
      { x: 0.707, y: -0.707 },
      { x: 1, y: 0 },
      { x: 0.707, y: 0.707 },
      { x: 0, y: 1 },
      { x: -0.707, y: 0.707 },
      { x: -1, y: 0 },
      { x: -0.707, y: -0.707 },
      { x: 0, y: -1 },
    ]
  }

  static get FOUR_STAR_POINTS() {
    return [
      { x: 0, y: -1 }, // Top point
      { x: 0.309, y: -0.309 }, // Upper-right point
      { x: 1, y: 0 }, // Right point
      { x: 0.309, y: 0.309 }, // Lower-right point
      { x: 0, y: 1 }, // Bottom point
      { x: -0.309, y: 0.309 }, // Lower-left point
      { x: -1, y: 0 }, // Left point
      { x: -0.309, y: -0.309 }, // Upper-left point
      { x: 0, y: -1 }, // Top point (repeated to close the loop)
    ]
  }

  static get STAR_5_POINTS() {
    return [
      { x: 0, y: -1 },
      { x: 0.2245, y: -0.309 },
      { x: 0.951, y: -0.309 },
      { x: 0.3633, y: 0.118 },
      { x: 0.5878, y: 0.809 },
      { x: 0, y: 0.382 },
      { x: -0.5878, y: 0.809 },
      { x: -0.3633, y: 0.118 },
      { x: -0.951, y: -0.309 },
      { x: -0.2245, y: -0.309 },
      { x: 0, y: -1 },
    ]
  }

  static get STAR_6_POINTS() {
    return [
      { x: 0, y: -1 },
      { x: 0.2245, y: -0.309 },
      { x: 0.951, y: -0.309 },
      { x: 0.3633, y: 0.118 },
      { x: 0.5878, y: 0.809 },
      { x: 0, y: 0.382 },
      { x: -0.5878, y: 0.809 },
      { x: -0.3633, y: 0.118 },
      { x: -0.951, y: -0.309 },
      { x: -0.2245, y: -0.309 },
      { x: 0, y: -1 },
    ]
  }
}


/** Morphes between different sets of points
 * It is required that the point sets are of the same length
 * Once the morph is complete it can automatically morph back again indefinitely.
 * @class
 * @property {Array<{x: number, y: number}>} points_current - The current set of points
 * @property {Array<{x: number, y: number}>} points_origin - The origin set of points
 * @property {Array<{x: number, y: number}>} points_target - The target set of points
 * @property {number} morph_durations - The duration of the morph in any unit. (Default is milliseconds)
 * @property {boolean} morph_started - Whether the morph has started
 * @property {boolean} morph_running - Whether the morph is currently running
 * @property {boolean} morph_complete - Whether the morph has completed
 * @property {number} morph_time_current - The current time of the morph
 * @property {number} morph_pct_current - The current percentage of the morph
 * @property {function} easing_fn - The easing function to use for the morph
 * @property {number} forward - The direction of the morph. True: forward, False: backward
 * @property {number} passes - The number of passes to make before stopping. 0 = bounce forever. (Default is 1)
 * @property {number} passes_current - The number of passes made
 * @property {boolean} reverse_on_complete - Reverse the morph direction on completion
 * @author Jon Bolmstedt
 */
class PointMorpherJB {
  #morph_start_time = 0

  constructor() {
    this.points_current = []
    this.points_origin = []
    this.points_target = []
    this.morph_duration = 1000
    this.morph_running = false
    this.morph_complete = false
    this.morph_time_current = 0
    this.morph_pct_current = 0
    this.easing_fn = lerp
    this.forward = true
    this.passes = 1
    this.passes_current = 0
    this.reverse_on_complete = true
  }

  /** Start or restart the morph
   * @param {number} [current_time] - Optional start time in any unit. (Default is millis())
   */
  start(current_time) {
    this.#morph_start_time = current_time === undefined ? millis() : current_time
    this.morph_running = true
    this.morph_complete = false
    this.points_current = this.points_origin.map((obj) => JSON.parse(JSON.stringify(obj)))
  }

  /** Update the morph
   * Once complete the points can be switched for a new morph.
   * Once complete then start must be called to restart the morph.
   * @param {number} [current_time] - Optional current time in any unit. (Default is millis())
   */
  update(current_time) {
    current_time = current_time === undefined ? millis() : current_time

    if (this.morph_complete === false || this.passes === 0) {
      this.morph_complete = false
      this.morph_running = true
      this.morph_time_current = current_time - this.#morph_start_time
      this.morph_pct_current = this.morph_time_current / this.morph_duration

      if (this.morph_pct_current >= 1) {
        this.morph_pct_current = 1
        this.passes_current += 1
        this.morph_complete = true
        if (this.passes > 0 && this.passes_current >= this.passes) {
          this.morph_running = false
        } else {
          this.#morph_start_time = current_time
          this.forward = !this.forward
        }
      } else {
        if (this.forward) {
          this.points_current = PointMorpherJB.morph_points(
            this.points_origin,
            this.points_target,
            this.morph_pct_current,
            this.easing_fn
          )
        } else if (this.forward === false) {
          this.points_current = PointMorpherJB.morph_points(
            this.points_target,
            this.points_origin,
            this.morph_pct_current,
            this.easing_fn
          )
        }
      }
    }
  }

  /** Morph the points
   * @param {Array<{x: number, y: number}>} points_origin - The current set of points
   * @param {Array<{x: number, y: number}>} points_target - The target set of points
   * @param {number} t - The ratio of the morph 0..1
   * @param {function} [fn] - Optional easing function that takes two numbers and a ratio
   * @returns {Array<{x: number, y: number}>} The morphed points
   *
   * @example
   * morph_points(
   *  [{x: 0, y: 0}, {x: 1, y: 1}],
   * [{x: 1, y: 0}, {x: 0, y: 1}],
   * 0.5
   * )
   * // Returns [{x: 0.5, y: 0}, {x: 0.5, y: 1}]
   * */
  static morph_points(points_origin, points_target, t, fn = lerp) {
    let points = []
    for (let i = 0; i < points_origin.length; i++) {
      let x = fn(points_origin[i].x, points_target[i].x, t)
      let y = fn(points_origin[i].y, points_target[i].y, t)
      points.push({ x: x, y: y })
    }
    return points
  }

  /** When setting new points, the points_target will first replace the points_current */
  // set_points(points) {
  //   this.points_origin = points
  //   this.points_target = points
  // }
}

