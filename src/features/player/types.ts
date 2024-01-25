export interface IPlayerProvider {
  videoElement: HTMLVideoElement | null;
  playPause: () => void;
  handleProgressive?: (e: boolean) => void;
  params: IPlayerParams;
  setLevel: (item: any, index: number) => void;
  setTrack: (e: number) => void;
}

export interface IPlayerParams {
  loading: boolean;
  fullScreen: boolean;
  isSettings: boolean;
  overlay: boolean;
  paused: boolean;
  currentTime: number;
  duration: number;
  canPlay: number;
  volume: number;

  /* list */
  audioTracks: any[];
  levels: any[];
  activeTrack: number;
  secondaryActiveTrack: any;
  activeLevel: number;
  secondaryActiveLevel: any;
}
