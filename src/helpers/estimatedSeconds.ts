export function calculateEstimatedSeconds(
  timecodeIn: string,
  timecodeOut: string,
) {
  // This function replicates the backend logic from OrdersService.CalculateTotalSecondsForOrderItem
  // and OrdersService.GetSecondsFromTimecodeModel

  const FPS_TIMING = 11; // Same as KinoDAL.Utils.Constants.FpsTimming

  // Parse timecode strings (format: "hh:mm:ss:fps")
  let timecodeInParts = timecodeIn.split(':').map((x) => parseInt(x));
  let timecodeOutParts = timecodeOut.split(':').map((x) => parseInt(x));

  // Extract components
  let inHours = timecodeInParts[0] || 0;
  let inMinutes = timecodeInParts[1] || 0;
  let inSeconds = timecodeInParts[2] || 0;
  let inFps = timecodeInParts[3] || 0;

  let outHours = timecodeOutParts[0] || 0;
  let outMinutes = timecodeOutParts[1] || 0;
  let outSeconds = timecodeOutParts[2] || 0;
  let outFps = timecodeOutParts[3] || 0;

  // Convert to total seconds (without fps adjustment yet)
  let timecodeInTotalSeconds = inHours * 3600 + inMinutes * 60 + inSeconds;
  let timecodeOutTotalSeconds = outHours * 3600 + outMinutes * 60 + outSeconds;

  // Apply FPS logic - same as backend GetSecondsFromTimecodeModel
  let timecodeInAdjusted;
  if (inFps <= FPS_TIMING) {
    timecodeInAdjusted = Math.floor(timecodeInTotalSeconds);
  } else {
    timecodeInAdjusted = Math.ceil(timecodeInTotalSeconds + 1);
  }

  let timecodeOutAdjusted;
  if (outFps <= FPS_TIMING) {
    timecodeOutAdjusted = Math.floor(timecodeOutTotalSeconds);
  } else {
    timecodeOutAdjusted = Math.ceil(timecodeOutTotalSeconds + 1);
  }

  // Calculate difference
  let estimatedSeconds = timecodeOutAdjusted - timecodeInAdjusted;

  // Backend ensures seconds is at least 1
  if (estimatedSeconds <= 0) {
    estimatedSeconds = 1;
  }

  return estimatedSeconds;
}

export function formatEstimatedSeconds(estimatedSeconds: number) {
  return estimatedSeconds == null ||
    isNaN(estimatedSeconds) ||
    estimatedSeconds < 0
    ? '-'
    : `${estimatedSeconds} sec`;
}
