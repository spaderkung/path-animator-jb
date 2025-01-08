
@example
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
