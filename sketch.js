let points = [],
  points_2 = []

/** @type {AnimatePointAlongProvidedPoints} */
let point_animator, point_animator_2, point_animator_3, point_animator_4

/** @type {PointMorpherJB} */
let point_morpher, point_morpher_2

// Reserved name for P5 library. This function will be called once.
function setup() {
  // frameRate(50)
  createCanvas(windowWidth, 0.99 * windowHeight * 0.99)
  angleMode(DEGREES)

  //#region Path animators
  //#region Box path
  points = GeoPointsJB.SQUARE_POINTS
  // GeoPointsJB.scale_points(points, 200)
  // GeoPointsJB.offset_points(points, {
  //   x: width * 0.25,
  //   y: height * 0.75,
  // })
  // For thumbnail
  GeoPointsJB.scale_points(points, min(width, height) * 0.45)
  GeoPointsJB.offset_points(points, {
    x: width * 0.5,
    y: height * 0.5,
  })

  point_animator = new AnimatePointAlongProvidedPoints(points)
  point_animator.duration = 10
  point_animator.draw_points = true
  point_animator.is_closed = true
  point_animator.stroke = "#D16969" //"#A31515"//"#CE9178"
  //#endregion

  //#region Ground paths
  points = [
    { x: 40.0, y: 600.0 },
    { x: 58.55, y: 607.02 },
    { x: 72.57, y: 605.08 },
    { x: 82.96, y: 596.3 },
    { x: 90.64, y: 582.83 },
    { x: 96.52, y: 566.8 },
    { x: 101.48, y: 550.37 },
    { x: 106.45, y: 535.67 },
    { x: 112.32, y: 524.83 },
    { x: 120.0, y: 520.0 },
    { x: 128.89, y: 520.96 },
    { x: 137.78, y: 525.46 },
    { x: 146.67, y: 532.59 },
    { x: 155.56, y: 541.45 },
    { x: 164.44, y: 551.14 },
    { x: 173.33, y: 560.74 },
    { x: 182.22, y: 569.36 },
    { x: 191.11, y: 576.08 },
    { x: 200.0, y: 580.0 },
    { x: 208.89, y: 581.95 },
    { x: 217.78, y: 583.24 },
    { x: 226.67, y: 583.7 },
    { x: 235.56, y: 583.18 },
    { x: 244.44, y: 581.51 },
    { x: 253.33, y: 578.52 },
    { x: 262.22, y: 574.05 },
    { x: 271.11, y: 567.93 },
    { x: 280.0, y: 560.0 },
    { x: 288.89, y: 548.5 },
    { x: 297.78, y: 532.73 },
    { x: 306.67, y: 514.07 },
    { x: 315.56, y: 493.94 },
    { x: 324.44, y: 473.72 },
    { x: 333.33, y: 454.81 },
    { x: 342.22, y: 438.63 },
    { x: 351.11, y: 426.56 },
    { x: 360.0, y: 420.0 },
    { x: 368.89, y: 419.67 },
    { x: 377.78, y: 424.53 },
    { x: 386.67, y: 433.33 },
    { x: 395.56, y: 444.86 },
    { x: 404.44, y: 457.86 },
    { x: 413.33, y: 471.11 },
    { x: 422.22, y: 483.37 },
    { x: 431.11, y: 493.42 },
    { x: 440.0, y: 500.0 },
    { x: 448.89, y: 503.07 },
    { x: 457.78, y: 503.84 },
    { x: 466.67, y: 502.96 },
    { x: 475.56, y: 501.1 },
    { x: 484.44, y: 498.9 },
    { x: 493.33, y: 497.04 },
    { x: 502.22, y: 496.16 },
    { x: 511.11, y: 496.93 },
    { x: 520.0, y: 500.0 },
    { x: 528.89, y: 505.93 },
    { x: 537.78, y: 514.32 },
    { x: 546.67, y: 524.44 },
    { x: 555.56, y: 535.56 },
    { x: 564.44, y: 546.91 },
    { x: 573.33, y: 557.78 },
    { x: 582.22, y: 567.41 },
    { x: 591.11, y: 575.06 },
    { x: 600.0, y: 580.0 },
    { x: 607.57, y: 582.06 },
    { x: 613.17, y: 581.89 },
    { x: 617.78, y: 580.0 },
    { x: 622.39, y: 576.87 },
    { x: 627.98, y: 573.0 },
    { x: 635.56, y: 568.89 },
    { x: 646.09, y: 565.02 },
    { x: 660.58, y: 561.89 },
    { x: 680.0, y: 560.0 },
  ]

  points_2 = [
    { x: 40.0, y: 600.0 },
    { x: 62.58, y: 599.25 },
    { x: 78.75, y: 587.53 },
    { x: 89.78, y: 567.48 },
    { x: 96.95, y: 541.74 },
    { x: 101.56, y: 512.95 },
    { x: 104.89, y: 483.74 },
    { x: 108.21, y: 456.75 },
    { x: 112.82, y: 434.63 },
    { x: 120.0, y: 420.0 },
    { x: 128.89, y: 412.54 },
    { x: 137.78, y: 409.44 },
    { x: 146.67, y: 409.63 },
    { x: 155.56, y: 412.04 },
    { x: 164.44, y: 415.61 },
    { x: 173.33, y: 419.26 },
    { x: 182.22, y: 421.92 },
    { x: 191.11, y: 422.52 },
    { x: 200.0, y: 420.0 },
    { x: 208.89, y: 414.18 },
    { x: 217.78, y: 406.06 },
    { x: 226.67, y: 396.3 },
    { x: 235.56, y: 385.54 },
    { x: 244.44, y: 374.46 },
    { x: 253.33, y: 363.7 },
    { x: 262.22, y: 353.94 },
    { x: 271.11, y: 345.82 },
    { x: 280.0, y: 340.0 },
    { x: 288.89, y: 336.27 },
    { x: 297.78, y: 333.85 },
    { x: 306.67, y: 332.59 },
    { x: 315.56, y: 332.32 },
    { x: 324.44, y: 332.87 },
    { x: 333.33, y: 334.07 },
    { x: 342.22, y: 335.78 },
    { x: 351.11, y: 337.81 },
    { x: 360.0, y: 340.0 },
    { x: 368.89, y: 343.02 },
    { x: 377.78, y: 347.35 },
    { x: 386.67, y: 352.59 },
    { x: 395.56, y: 358.33 },
    { x: 404.44, y: 364.14 },
    { x: 413.33, y: 369.63 },
    { x: 422.22, y: 374.38 },
    { x: 431.11, y: 377.97 },
    { x: 440.0, y: 380.0 },
    { x: 448.89, y: 381.4 },
    { x: 457.78, y: 383.05 },
    { x: 466.67, y: 384.44 },
    { x: 475.56, y: 385.1 },
    { x: 484.44, y: 384.53 },
    { x: 493.33, y: 382.22 },
    { x: 502.22, y: 377.7 },
    { x: 511.11, y: 370.45 },
    { x: 520.0, y: 360.0 },
    { x: 528.89, y: 344.58 },
    { x: 537.78, y: 323.81 },
    { x: 546.67, y: 299.26 },
    { x: 555.56, y: 272.48 },
    { x: 564.44, y: 245.05 },
    { x: 573.33, y: 218.52 },
    { x: 582.22, y: 194.46 },
    { x: 591.11, y: 174.43 },
    { x: 600.0, y: 160.0 },
    { x: 608.45, y: 152.1 },
    { x: 616.24, y: 149.63 },
    { x: 623.7, y: 151.11 },
    { x: 631.17, y: 155.06 },
    { x: 638.96, y: 160.0 },
    { x: 647.41, y: 164.44 },
    { x: 656.84, y: 166.91 },
    { x: 667.6, y: 165.93 },
    { x: 680.0, y: 160.0 },
  ]

  // Ground as Border around
  g_points = [
    { x: 358.0, y: 197.35 },
    { x: 369.19, y: 190.32 },
    { x: 384.34, y: 186.59 },
    { x: 402.44, y: 185.49 },
    { x: 422.53, y: 186.37 },
    { x: 443.6, y: 188.57 },
    { x: 464.67, y: 191.42 },
    { x: 484.75, y: 194.27 },
    { x: 502.86, y: 196.47 },
    { x: 518.0, y: 197.35 },
    { x: 529.96, y: 197.35 },
    { x: 539.62, y: 197.35 },
    { x: 547.63, y: 197.35 },
    { x: 554.65, y: 197.35 },
    { x: 561.35, y: 197.35 },
    { x: 568.37, y: 197.35 },
    { x: 576.38, y: 197.35 },
    { x: 586.04, y: 197.35 },
    { x: 598.0, y: 197.35 },
    { x: 613.14, y: 196.47 },
    { x: 631.25, y: 194.27 },
    { x: 651.33, y: 191.42 },
    { x: 672.4, y: 188.57 },
    { x: 693.47, y: 186.37 },
    { x: 713.56, y: 185.49 },
    { x: 731.66, y: 186.59 },
    { x: 746.81, y: 190.32 },
    { x: 758.0, y: 197.35 },
    { x: 765.02, y: 208.54 },
    { x: 768.75, y: 223.68 },
    { x: 769.85, y: 241.79 },
    { x: 768.97, y: 261.87 },
    { x: 766.78, y: 282.94 },
    { x: 763.93, y: 304.01 },
    { x: 761.07, y: 324.1 },
    { x: 758.88, y: 342.2 },
    { x: 758.0, y: 357.35 },
    { x: 758.0, y: 369.31 },
    { x: 758.0, y: 378.96 },
    { x: 758.0, y: 386.98 },
    { x: 758.0, y: 394.0 },
    { x: 758.0, y: 400.69 },
    { x: 758.0, y: 407.72 },
    { x: 758.0, y: 415.73 },
    { x: 758.0, y: 425.38 },
    { x: 758.0, y: 437.35 },
    { x: 758.31, y: 452.34 },
    { x: 759.08, y: 470.06 },
    { x: 760.07, y: 489.64 },
    { x: 761.07, y: 510.21 },
    { x: 761.84, y: 530.9 },
    { x: 762.15, y: 550.83 },
    { x: 761.76, y: 569.13 },
    { x: 760.46, y: 584.92 },
    { x: 758.0, y: 597.35 },
    { x: 754.39, y: 606.71 },
    { x: 749.86, y: 614.03 },
    { x: 744.52, y: 619.53 },
    { x: 738.49, y: 623.39 },
    { x: 731.88, y: 625.83 },
    { x: 724.81, y: 627.04 },
    { x: 717.4, y: 627.23 },
    { x: 709.76, y: 626.59 },
    { x: 702.0, y: 625.34 },
    { x: 693.69, y: 622.56 },
    { x: 684.5, y: 617.6 },
    { x: 674.7, y: 611.04 },
    { x: 664.56, y: 603.46 },
    { x: 654.33, y: 595.44 },
    { x: 644.3, y: 587.54 },
    { x: 634.72, y: 580.34 },
    { x: 625.86, y: 574.42 },
    { x: 618.0, y: 570.36 },
    { x: 611.02, y: 567.79 },
    { x: 604.59, y: 565.97 },
    { x: 598.67, y: 564.88 },
    { x: 593.2, y: 564.49 },
    { x: 588.14, y: 564.78 },
    { x: 583.44, y: 565.73 },
    { x: 579.05, y: 567.32 },
    { x: 574.92, y: 569.54 },
    { x: 571.0, y: 572.36 },
    { x: 567.62, y: 576.37 },
    { x: 564.99, y: 581.89 },
    { x: 562.89, y: 588.5 },
    { x: 561.1, y: 595.74 },
    { x: 559.4, y: 603.19 },
    { x: 557.56, y: 610.42 },
    { x: 555.36, y: 616.97 },
    { x: 552.58, y: 622.42 },
    { x: 549.0, y: 626.34 },
    { x: 544.43, y: 628.98 },
    { x: 538.98, y: 630.92 },
    { x: 532.93, y: 632.18 },
    { x: 526.51, y: 632.78 },
    { x: 519.99, y: 632.72 },
    { x: 513.63, y: 632.04 },
    { x: 507.67, y: 630.73 },
    { x: 502.38, y: 628.83 },
    { x: 498.0, y: 626.34 },
    { x: 494.58, y: 622.68 },
    { x: 491.88, y: 617.57 },
    { x: 489.74, y: 611.41 },
    { x: 488.01, y: 604.64 },
    { x: 486.53, y: 597.68 },
    { x: 485.15, y: 590.94 },
    { x: 483.7, y: 584.86 },
    { x: 482.04, y: 579.86 },
    { x: 480.0, y: 576.35 },
    { x: 477.84, y: 574.14 },
    { x: 475.84, y: 572.69 },
    { x: 473.89, y: 571.95 },
    { x: 471.88, y: 571.86 },
    { x: 469.69, y: 572.37 },
    { x: 467.22, y: 573.43 },
    { x: 464.36, y: 574.98 },
    { x: 460.99, y: 576.97 },
    { x: 457.0, y: 579.35 },
    { x: 452.23, y: 582.75 },
    { x: 446.72, y: 587.52 },
    { x: 440.63, y: 593.24 },
    { x: 434.15, y: 599.44 },
    { x: 427.45, y: 605.7 },
    { x: 420.7, y: 611.56 },
    { x: 414.1, y: 616.59 },
    { x: 407.8, y: 620.33 },
    { x: 402.0, y: 622.34 },
    { x: 396.39, y: 623.28 },
    { x: 390.64, y: 623.94 },
    { x: 384.89, y: 624.04 },
    { x: 379.28, y: 623.3 },
    { x: 373.93, y: 621.44 },
    { x: 369.0, y: 618.19 },
    { x: 364.61, y: 613.28 },
    { x: 360.9, y: 606.42 },
    { x: 358.0, y: 597.35 },
    { x: 356.07, y: 585.06 },
    { x: 355.04, y: 569.33 },
    { x: 354.74, y: 551.05 },
    { x: 354.98, y: 531.11 },
    { x: 355.59, y: 510.38 },
    { x: 356.37, y: 489.75 },
    { x: 357.16, y: 470.12 },
    { x: 357.76, y: 452.35 },
    { x: 358.0, y: 437.35 },
    { x: 358.0, y: 425.38 },
    { x: 358.0, y: 415.73 },
    { x: 358.0, y: 407.72 },
    { x: 358.0, y: 400.69 },
    { x: 358.0, y: 394.0 },
    { x: 358.0, y: 386.98 },
    { x: 358.0, y: 378.96 },
    { x: 358.0, y: 369.31 },
    { x: 358.0, y: 357.35 },
    { x: 357.12, y: 342.2 },
    { x: 354.93, y: 324.1 },
    { x: 352.07, y: 304.01 },
    { x: 349.22, y: 282.94 },
    { x: 347.03, y: 261.87 },
    { x: 346.15, y: 241.79 },
    { x: 347.25, y: 223.68 },
    { x: 350.98, y: 208.54 },
    { x: 358.0, y: 197.35 },
  ]

  g_points_2 = [
    { x: 358.0, y: 197.35 },
    { x: 368.62, y: 191.85 },
    { x: 383.46, y: 190.25 },
    { x: 401.48, y: 191.71 },
    { x: 421.64, y: 195.41 },
    { x: 442.88, y: 200.52 },
    { x: 464.19, y: 206.19 },
    { x: 484.5, y: 211.61 },
    { x: 502.78, y: 215.93 },
    { x: 518.0, y: 218.34 },
    { x: 529.96, y: 219.37 },
    { x: 539.62, y: 220.15 },
    { x: 547.63, y: 220.67 },
    { x: 554.65, y: 220.93 },
    { x: 561.35, y: 220.93 },
    { x: 568.37, y: 220.67 },
    { x: 576.38, y: 220.15 },
    { x: 586.04, y: 219.37 },
    { x: 598.0, y: 218.34 },
    { x: 613.24, y: 215.93 },
    { x: 631.58, y: 211.61 },
    { x: 651.96, y: 206.19 },
    { x: 673.34, y: 200.52 },
    { x: 694.64, y: 195.41 },
    { x: 714.81, y: 191.71 },
    { x: 732.81, y: 190.25 },
    { x: 747.55, y: 191.85 },
    { x: 758.0, y: 197.35 },
    { x: 763.79, y: 207.62 },
    { x: 765.79, y: 222.27 },
    { x: 764.81, y: 240.24 },
    { x: 761.65, y: 260.43 },
    { x: 757.1, y: 281.79 },
    { x: 751.96, y: 303.24 },
    { x: 747.03, y: 323.69 },
    { x: 743.11, y: 342.09 },
    { x: 741.0, y: 357.35 },
    { x: 740.16, y: 369.31 },
    { x: 739.53, y: 378.96 },
    { x: 739.11, y: 386.98 },
    { x: 738.9, y: 394.0 },
    { x: 738.9, y: 400.69 },
    { x: 739.11, y: 407.72 },
    { x: 739.53, y: 415.73 },
    { x: 740.16, y: 425.38 },
    { x: 741.0, y: 437.35 },
    { x: 742.45, y: 452.37 },
    { x: 744.71, y: 470.17 },
    { x: 747.48, y: 489.87 },
    { x: 750.46, y: 510.54 },
    { x: 753.35, y: 531.31 },
    { x: 755.85, y: 551.27 },
    { x: 757.66, y: 569.53 },
    { x: 758.48, y: 585.19 },
    { x: 758.0, y: 597.35 },
    { x: 756.25, y: 606.18 },
    { x: 753.52, y: 612.68 },
    { x: 749.96, y: 617.16 },
    { x: 745.71, y: 619.93 },
    { x: 740.91, y: 621.32 },
    { x: 735.7, y: 621.64 },
    { x: 730.22, y: 621.2 },
    { x: 724.61, y: 620.33 },
    { x: 719.0, y: 619.34 },
    { x: 713.23, y: 617.29 },
    { x: 707.08, y: 613.39 },
    { x: 700.59, y: 608.19 },
    { x: 693.84, y: 602.24 },
    { x: 686.87, y: 596.09 },
    { x: 679.74, y: 590.27 },
    { x: 672.52, y: 585.35 },
    { x: 665.25, y: 581.86 },
    { x: 658.0, y: 580.35 },
    { x: 650.5, y: 581.19 },
    { x: 642.57, y: 584.0 },
    { x: 634.37, y: 588.24 },
    { x: 626.07, y: 593.37 },
    { x: 617.84, y: 598.84 },
    { x: 609.85, y: 604.12 },
    { x: 602.27, y: 608.66 },
    { x: 595.26, y: 611.91 },
    { x: 589.0, y: 613.34 },
    { x: 583.62, y: 612.88 },
    { x: 579.01, y: 611.03 },
    { x: 575.0, y: 608.12 },
    { x: 571.4, y: 604.47 },
    { x: 568.01, y: 600.4 },
    { x: 564.67, y: 596.24 },
    { x: 561.17, y: 592.29 },
    { x: 557.35, y: 588.89 },
    { x: 553.0, y: 586.35 },
    { x: 548.14, y: 584.3 },
    { x: 542.97, y: 582.22 },
    { x: 537.56, y: 580.24 },
    { x: 532.0, y: 578.49 },
    { x: 526.37, y: 577.07 },
    { x: 520.78, y: 576.13 },
    { x: 515.29, y: 575.78 },
    { x: 510.0, y: 576.15 },
    { x: 505.0, y: 577.35 },
    { x: 500.27, y: 579.93 },
    { x: 495.71, y: 584.02 },
    { x: 491.3, y: 589.16 },
    { x: 486.99, y: 594.9 },
    { x: 482.77, y: 600.77 },
    { x: 478.59, y: 606.31 },
    { x: 474.43, y: 611.05 },
    { x: 470.24, y: 614.55 },
    { x: 466.0, y: 616.34 },
    { x: 461.64, y: 616.24 },
    { x: 457.14, y: 614.62 },
    { x: 452.59, y: 611.86 },
    { x: 448.05, y: 608.3 },
    { x: 443.6, y: 604.32 },
    { x: 439.3, y: 600.27 },
    { x: 435.22, y: 596.52 },
    { x: 431.43, y: 593.42 },
    { x: 428.0, y: 591.35 },
    { x: 425.15, y: 590.14 },
    { x: 422.92, y: 589.36 },
    { x: 421.11, y: 588.94 },
    { x: 419.52, y: 588.82 },
    { x: 417.96, y: 588.93 },
    { x: 416.22, y: 589.2 },
    { x: 414.12, y: 589.57 },
    { x: 411.44, y: 589.98 },
    { x: 408.0, y: 590.35 },
    { x: 403.42, y: 591.69 },
    { x: 397.7, y: 594.57 },
    { x: 391.22, y: 598.27 },
    { x: 384.38, y: 602.07 },
    { x: 377.55, y: 605.25 },
    { x: 371.11, y: 607.09 },
    { x: 365.45, y: 606.86 },
    { x: 360.95, y: 603.86 },
    { x: 358.0, y: 597.35 },
    { x: 356.75, y: 586.46 },
    { x: 356.9, y: 571.48 },
    { x: 358.15, y: 553.42 },
    { x: 360.17, y: 533.3 },
    { x: 362.66, y: 512.13 },
    { x: 365.3, y: 490.94 },
    { x: 367.78, y: 470.73 },
    { x: 369.78, y: 452.53 },
    { x: 371.0, y: 437.35 },
    { x: 371.64, y: 425.38 },
    { x: 372.12, y: 415.73 },
    { x: 372.44, y: 407.72 },
    { x: 372.6, y: 400.69 },
    { x: 372.6, y: 394.0 },
    { x: 372.44, y: 386.98 },
    { x: 372.12, y: 378.96 },
    { x: 371.64, y: 369.31 },
    { x: 371.0, y: 357.35 },
    { x: 369.18, y: 342.09 },
    { x: 365.66, y: 323.69 },
    { x: 361.22, y: 303.24 },
    { x: 356.62, y: 281.79 },
    { x: 352.63, y: 260.43 },
    { x: 350.0, y: 240.24 },
    { x: 349.51, y: 222.27 },
    { x: 351.92, y: 207.62 },
    { x: 358.0, y: 197.35 },
  ]

  if (true) {
    let sc = min(width, height) * 0.9
    sc = {x: sc*1, y: sc*1}
    GeoPointsJB.normalize_points(g_points)
    GeoPointsJB.scale_points(g_points, sc)
    GeoPointsJB.offset_points(g_points, { x: width * 0.5, y: height * 0.5 })

    GeoPointsJB.normalize_points(g_points_2)
    GeoPointsJB.scale_points(g_points_2, sc)
    GeoPointsJB.offset_points(g_points_2, { x: width * 0.5, y: height * 0.5 })
  } else {
    // Thumbnail
    let wo = 0.1
    let ho = 0.25
    GeoPointsJB.normalize_points(points)
    GeoPointsJB.scale_points(points, width*.95)
    GeoPointsJB.offset_points(points, { x: -width*wo, y: height*ho })

    GeoPointsJB.normalize_points(points_2)
    GeoPointsJB.scale_points(points_2, width * 0.95)
    GeoPointsJB.offset_points(points_2, { x: -width * wo, y: height * ho })
  }
  point_animator_2 = new AnimatePointAlongProvidedPoints(g_points)
  point_animator_2.duration = 60
  point_animator_2.t = 0.45
  point_animator_2.draw_points = false
  point_animator_2.is_closed = true
  point_animator_2.normal_sharpening = 0
  point_animator_2.flip_normals = false

  point_morpher = new PointMorpherJB()
  point_morpher.morph_duration = 8000
  point_morpher.passes = 0 // Bounce forever
  point_morpher.easing_fn = smoothstep
  point_morpher.points_origin = g_points.map(obj => JSON.parse(JSON.stringify(obj)));
  point_morpher.points_target = g_points_2.map(obj => JSON.parse(JSON.stringify(obj)));
  point_morpher.start()
  //#endregion

  //#region Box with extra points flanking each corner for more local normal smoothing.
  // This creates sharper smoothing even if it is at max, since the longer
  // side segment will not be affected by smoothing
  points = GeoPointsJB.SQUARE_WITH_EXTRA_90_PCT_CORNER_POINTS
  GeoPointsJB.scale_points(points, min(width, height) * 0.65)
  // GeoPointsJB.offset_points(points, {
  //   x: width * 0.75,
  //   y: height * 0.75,
  // })
  // For thumbnail
  GeoPointsJB.offset_points(points, {
    x: width * 0.5,
    y: height * 0.5,
  })
  point_animator_3 = new AnimatePointAlongProvidedPoints(points)
  point_animator_3.duration = 10
  point_animator_3.draw_points = true
  point_animator_3.is_closed = true
  point_animator_3.normal_sharpening = 0
  point_animator_3.stroke = color(227, 186, 23) //"#DCDCAA"
  //#endregion

  //#region Point animator with sharpened normals, morphing between 4 shapes.
  // For morphing the geometric shapes, keep the same number of points in them.
  // The 5-point star has 10 points but its 11 beacause an end point at the start.
  let thumb_scale = 0.3
  five_star_for_morpher = GeoPointsJB.STAR_5_POINTS
  if (false) {
    GeoPointsJB.normalize_points(five_star_for_morpher)
    // points = GeoPointsJB.generate_polygon_points(6, 1, -1/4 + 1/6)
    // points.push({x:points[0].x, y:points[0].y}) // Close the loop
    GeoPointsJB.scale_points(five_star_for_morpher, 200)
    GeoPointsJB.offset_points(five_star_for_morpher, { x: width * 0.25, y: height * 0.25 })
  } else {
    // Thumbnail
    GeoPointsJB.normalize_points(five_star_for_morpher)
    // points = GeoPointsJB.generate_polygon_points(6, 1, -1/4 + 1/6)
    // points.push({x:points[0].x, y:points[0].y}) // Close the loop
    GeoPointsJB.scale_points(five_star_for_morpher, min(width, height) * thumb_scale)
    GeoPointsJB.offset_points(five_star_for_morpher, { x: width * 0.5, y: height * 0.5 })
  }
  box_for_morpher = [
    { x: -0.5, y: -0.5 },
    { x: 0.4, y: -0.5 }, // x 0 Midpoint of bottom side
    { x: 0.5, y: -0.5 },
    { x: 0.5, y: -0.4 }, // -0.25Quarter point of right side
    { x: 0.5, y: 0 }, // Midpoint of right side
    { x: 0.5, y: 0.5 },
    { x: 0, y: 0.5 }, // Midpoint of top side
    { x: -0.4, y: 0.5 }, // -.25 Quarter point of top side
    { x: -0.5, y: 0.5 },
    { x: -0.5, y: 0 }, // Midpoint of left side
    { x: -0.5, y: -0.5 }, // Back again, same as first
  ]
  if (false) {
    GeoPointsJB.normalize_points(box_for_morpher)
    GeoPointsJB.scale_points(box_for_morpher, 200)
    GeoPointsJB.offset_points(box_for_morpher, { x: width * 0.5, y: height * 0.25 })
  } else {
    // Thumbnail
    GeoPointsJB.normalize_points(box_for_morpher)
    GeoPointsJB.scale_points(box_for_morpher, min(width, height) * thumb_scale)
    GeoPointsJB.offset_points(box_for_morpher, { x: width * 0.5, y: height * 0.5 })
  }
  four_star_for_morpher = [
    { x: 0, y: -1 }, // Top point
    { x: 0.309, y: -0.309 }, // Upper-right point
    { x: 1, y: 0 }, // Right point
    { x: 0.6545, y: 0.1545 }, // Midpoint between right and lower-right
    { x: 0.309, y: 0.309 }, // Lower-right point
    { x: 0, y: 1 }, // Bottom point
    { x: -0.309, y: 0.309 }, // Lower-left point
    { x: -1, y: 0 }, // Left point
    { x: -0.309, y: -0.309 }, // Upper-left point
    { x: -0.1545, y: -0.6545 }, // Midpoint between upper-left and top
    { x: 0, y: -1 }, // Top point (repeated to close the loop)
  ]
  if (false) {
    GeoPointsJB.normalize_points(four_star_for_morpher)
    GeoPointsJB.scale_points(four_star_for_morpher, 200)
    GeoPointsJB.offset_points(four_star_for_morpher, { x: width * 0.25, y: height * 0.25 })
  } else {
    // Thu,mbnail
    GeoPointsJB.normalize_points(four_star_for_morpher)
    GeoPointsJB.scale_points(four_star_for_morpher, min(width, height) * thumb_scale)
    GeoPointsJB.offset_points(four_star_for_morpher, { x: width * 0.5, y: height * 0.5 })
  }

  five_eder_for_morpher = [
    { x: 0, y: -1 },
    { x: 0.4755, y: -0.6545 }, // Midpoint between top and upper-right
    { x: 0.951, y: -0.309 },
    { x: 0.7695, y: 0.25 }, // Midpoint between upper-right and right
    { x: 0.588, y: 0.809 },
    { x: 0, y: 0.809 }, // Midpoint between right and bottom-right
    { x: -0.588, y: 0.809 },
    { x: -0.7695, y: 0.25 }, // Midpoint between bottom-right and bottom-left
    { x: -0.951, y: -0.309 },
    { x: -0.4755, y: -0.6545 }, // Midpoint between bottom-left and top
    { x: 0, y: -1 }, // Back again to the start
  ]
  if (false) {
    GeoPointsJB.normalize_points(five_eder_for_morpher)
    GeoPointsJB.scale_points(five_eder_for_morpher, 200)
    GeoPointsJB.offset_points(five_eder_for_morpher, { x: width * 0.5, y: height * 0.25 })
  } else {
    // Thumbnail
    GeoPointsJB.normalize_points(five_eder_for_morpher)
    GeoPointsJB.scale_points(five_eder_for_morpher, min(width, height) * thumb_scale)
    GeoPointsJB.offset_points(five_eder_for_morpher, { x: width * 0.5, y: height * 0.5 })
  }

  point_animator_4 = new AnimatePointAlongProvidedPoints(five_star_for_morpher)
  point_animator_4.duration = 40
  dpf = 40
  point_animator_4.draw_points = true
  point_animator_4.is_closed = true
  point_animator_4.normal_sharpening = 0.75 //0.85
  point_animator_4.stroke = "#6796E6"

  point_morpher_2 = new PointMorpherJB()
  point_morpher_2.morph_duration = 5000
  point_morpher_2.passes = 0 // Bounce forever
  point_morpher_2.easing_fn = smoothstep8
  point_morpher_2.points_origin = five_star_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
  point_morpher_2.points_target = box_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
  point_morpher_2.start()
  point_morpher_2.step = 0 // New property for the step sequencer
  //#endregion

  //#endregion Path animators
  seed = random(1000)
}

// Reserved name for P5 library. This function will be called repeatedly.
function draw() {
  background("#131415")

  // Point animator box
  point_animator.update(deltaTime / 1000)
  point_animator.draw()
  point_animator.draw_normals(29, 0, 20)
  strokeWeight(2)
  strokeWeight(4) // Thumbnail
  fill(0)
  for (let i = 0; i < point_animator.points.length - 1; i++) {
    line(
      point_animator.points[i].x,
      point_animator.points[i].y,
      point_animator.points[i + 1].x,
      point_animator.points[i + 1].y
    )
  }
  for (let i = 0; i < point_animator.points.length - 1; i++) {
    let p = point_animator.points[i]
    circle(p.x, p.y, 10)
  }

  // Point animator ground
  point_animator_2.points = point_morpher.points_current
  point_animator_2.update(deltaTime / 1000)
  randomSeed(seed)
  let ns = 0.1
  // Grass on horisontal surfaces. Known by the normal.
  for (let t = 0; t < 1; t += random(0.0005, 0.002)) {
    let info = point_animator_2.get_local_info_at(t)
    let ns_x = (noise(floor(info.p.x) * ns) - 0.5) * 2
    let ns_x2 = (noise(info.p.x * ns * 2) - 0.5) * 2
    strokeWeight(0.5 + 2.5 * noise(t * 10))
    let n = point_animator_2.normal_interpolated_at_segment(info.i, info.t)
    let g_factor = p5.Vector.dot(n, createVector(0, -1)) // -1..1
    g_factor = map(g_factor, -1, 1, 0, 1)
    let grass_length = ss(g_factor * 2) * (6 + 4 * ns_x2)
    stroke(30 + 10 * ns_x, 80 + 20 * ns_x, 50 + 20 * ns_x)
    line(info.p.x, info.p.y, info.p.x + 10 * (noise(t * 10) - 0.5), info.p.y + grass_length)
  }
  // Ground
  for (let t = 0; t < 1; t += 0.003) {
    colorMode(HSB, 100)
    let info = point_animator_2.get_local_info_at(t)
    let ns_x = noise(info.p.x * ns) - 0.5
    let c = color(20 + 35 * ns_x, 80 + 10 * ns_x, 55 + 30 * ns_x, 90)
    fill(c)
    stroke(c)
    circle(info.p.x, info.p.y, 3 + 8 * noise(t * 500))
  }
  point_morpher.update()

  // Point animator box extra points
  point_animator_3.update(deltaTime / 1000)
  point_animator_3.draw()
  point_animator_3.draw_normals(5, 0, 20)
  strokeWeight(2)
  strokeWeight(4) // Thumbnail
  fill(0)
  for (let i = 0; i < point_animator_3.points.length - 1; i++) {
    line(
      point_animator_3.points[i].x,
      point_animator_3.points[i].y,
      point_animator_3.points[i + 1].x,
      point_animator_3.points[i + 1].y
    )
  }
  for (let i = 0; i < point_animator_3.points.length - 1; i++) {
    let p = point_animator_3.points[i]
    circle(p.x, p.y, 10)
  }

  // Point animator box 4 points, sharpened normals.
  point_animator_4.points = point_morpher_2.points_current
  point_animator_4.duration = point_animator_4.length / dpf
  point_animator_4.update(deltaTime / 1000)
  point_animator_4.draw()
  point_animator_4.draw_normals(3, 0, 20)
  strokeWeight(2)
  strokeWeight(4) // Thumbnail
  fill(0)
  for (let i = 0; i < point_animator_4.points.length - 1; i++) {
    line(
      point_animator_4.points[i].x,
      point_animator_4.points[i].y,
      point_animator_4.points[i + 1].x,
      point_animator_4.points[i + 1].y
    )
  }
  for (let i = 0; i < point_animator_4.points.length - 1; i++) {
    let p = point_animator_4.points[i]
    circle(p.x, p.y, 10)
  }
  point_morpher_2.update()

  // Really simple step sequencer for multiple shapes to morph between
  if (point_morpher_2.morph_complete) {
    point_morpher_2.step = (point_morpher_2.step + 1) % 4

    if (point_morpher_2.step === 1) {
      point_morpher_2.points_origin = four_star_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
      point_morpher_2.points_target = box_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
    } else if (point_morpher_2.step === 2) {
      point_morpher_2.points_origin = four_star_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
      point_morpher_2.points_target = five_eder_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
    } else if (point_morpher_2.step === 3) {
      point_morpher_2.points_origin = five_star_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
      point_morpher_2.points_target = five_eder_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
    } else if (point_morpher_2.step === 0) {
      point_morpher_2.points_origin = five_star_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
      point_morpher_2.points_target = box_for_morpher.map(obj => JSON.parse(JSON.stringify(obj)));
    }
  }

  // Draw the cars
  textAlign(CENTER, CENTER)
  textSize(30)
  draw_car_on_animator(point_animator, "🚽")
  draw_car_on_animator(point_animator_2)
  draw_car_on_animator(point_animator_3, "🚀", 135, 0)
  draw_car_on_animator(point_animator_4, "🛸", 90, 0)
}

function draw_car_on_animator(animator, icon, rotation, offset) {
  icon = icon === undefined ? "🚗" : icon
  rotation = rotation === undefined ? 90 : rotation
  offset = offset === undefined ? 12 : offset
  push()
  translate(animator.current_position.x, animator.current_position.y)
  // Offset the car from the ground by moving up from the normal
  translate(p5.Vector.mult(animator.normal_interpolated, offset))
  rotate(animator.normal_interpolated.heading() + rotation)
  text(icon, 0, 0)
  pop()
}

function ss(t) {
  return t * t * (3.0 - 2.0 * t)
}

function smoothstep(a, b, t) {
  const f = t * t * (3.0 - 2.0 * t)
  return a + f * (b - a)
}

function smoothstep2(a, b, t) {
  const f = t * t * (3.0 - 2.0 * t)
  return a + f ** 2 * (b - a)
}

function smoothstep8(a, b, t) {
  const f = t * t * (3.0 - 2.0 * t)
  return a + f ** 8 * (b - a)
}
