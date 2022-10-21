export type SearchItems = {
  id: { kind: string; channelId: string; videoId: string; playlistId: string };
  kind: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
};

export type SearchType = {
  data: {
    kind: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
      resultsPerPage: number;
      totalResults: number;
    };
    items: SearchItems[];
  };
};

export type PlayListItems = {
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: {
      kind: string;
      videoId: string;
    };
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    title: string;
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
  };
};

export type PlaylistType = {
  data: {
    kind: string;
    nextPageToken: string;
    pageInfo: {
      resultsPerPage: number;
      totalResults: number;
    };
    items: PlayListItems[];
  };
};

export type ChannelItems = {
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
};

export type ChannelType = {
  data: {
    kind: string;
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    regionCode: string;
    items: ChannelItems[];
  };
};

export type Notes = {
  notes: {
    created_at: string;
    note_id: string;
    video_id: string;
    video_title: string;
    __typename?: string;
  }[];
};

export type TipTapProps = {
  videoId: string | string[] | undefined;
  videoTitle: string | undefined;
  findNote: {
    note: string;
    note_id: string;
    video_id: string;
    _typename: string;
  };
};

export type TipTapNavProps = {
  findNote: {
    note: string;
    note_id: string;
    video_id: string;
    _typename?: string;
  };
  notes: string | undefined;
  videoId: string | string[] | undefined;
  videoTitle: string | undefined;
};
