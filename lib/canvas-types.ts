export interface CanvasParams {
  seed: number;
  peakCount: number;
  noiseAmount: number;
  contourCount: number;
  lineWeight: number;
  waveAmplitude: number;
  waveFrequency: number;
  waveSpeed: number;
  waveAngle: number;
  colorPalette: [string, string, string];
}

export const DEFAULT_PARAMS: CanvasParams = {
  seed: 180,
  peakCount: 15,
  noiseAmount: 0.58,
  contourCount: 30,
  lineWeight: 0.4,
  waveAmplitude: 0.06,
  waveFrequency: 0.005,
  waveSpeed: 0.3,
  waveAngle: 140,
  colorPalette: ["#3a5565", "#5a4e35", "#5a3a22"],
};
