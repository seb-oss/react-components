export interface VideoProps {
    /** Allow video to be played in full screen mode */
    allowFullScreen?: boolean;
    /** `Support Vimeo only` prevent the player from tracking session data, including cookies */
    allowSessionTracking?: boolean;
    /** `Support Vimeo only` pause the current video when another Vimeo video on the same page starts to play */
    autopause?: boolean;
    /** Play video automatically */
    autoplay?: boolean;
    /** Element class name */
    className?: string;
    /** Color value of the video controls: Youtube player only supports `red` | `white` */
    color?: "red" | "white" | string;
    /** `Support Youtube only` disable keyboard controls */
    disableKeyboardInteraction?: boolean;
    /** `Support Youtube only` enables the player to be controlled via IFrame Player API calls */
    enableAPIControl?: boolean;
    /** Element height */
    height: string;
    /** `Support Youtube only` hides YouTube logo */
    hideBranding?: boolean;
    /** Element ID */
    id?: string;
    /** Video player's interface language */
    language?: string;
    /** Loop video */
    loop?: boolean;
    /** `Support Vimeo only` the playback quality of the video */
    muted?: boolean;
    /** Element name */
    name: string;
    /** `Support Youtube only` provides an extra security measure for the IFrame API */
    origin?: string;
    /** `Support Youtube only` specifies a comma-separated list of video IDs to play */
    playlist?: string;
    /** controls whether videos play inline or fullscreen in an HTML5 player on iOS or mobile devices */
    playsinline?: boolean;
    /** `Support Vimeo only` the playback quality of the video */
    quality?: "240p" | "360p" | "540p" | "720p" | "1080p" | "2k" | "4k";
    /** `Support Vimeo only` set the background of the player area to transparent */
    setBackgroundAsTransparent?: boolean;
    /** `Support Vimeo only` display video as a background video */
    showAsBackgroundVideo?: boolean;
    /** `Support Youtube only` show captions */
    showCaptions?: boolean;
    /** Show video controls */
    showControls?: boolean;
    /** `Support Vimeo only` show owner's name */
    showOwnerName?: boolean;
    /** `Support Vimeo only` show owner's portrait */
    showOwnerPortrait?: boolean;
    /** `Support Vimeo only` show speed setting */
    showPlaybackSpeedSetting?: boolean;
    /** `Support Youtube only` if it's set to false, related videos will come from the same channel as the video that was just played, default: `true` */
    showRelatedVideosFromDifferentChannel?: boolean;
    /** `Support Vimeo only` display the video's title. */
    showTitle?: boolean;
    /** `Support Youtube only` shows video annotations, default: `true` */
    showVideoAnnotations?: boolean;
    /** Element source */
    src: string;
    /** Begin playing the video at the given number of seconds */
    startTime?: number;
    /** `Support Youtube only` specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. */
    endTime?: number;
    /** `Support Vimeo only` to enable informal error messages in the player */
    vimeoFunMode?: boolean;
    /** `Support Youtube only` identifies the URL where the player is embedded */
    widgetReferrer?: string;
    /** Element width */
    width: string;
    /** `Support Youtube only` identifies the list that will load in the player */
    youtubeList?: string;
    /** `Support Youtube only` identifies the type of list that will load in the player */
    youtubeListType?: "user_uploads" | "playlist";
}

export type MapperItem<T> = { keys: Array<keyof T>; values?: { oldValue: T[keyof T]; newValue: any }; conjunctionSymbol?: "&" | "#" };

export type Mapper<T> = Record<keyof VideoProps, MapperItem<T>>;

interface CommonAPI {
    /** Play video automatically */
    autoplay?: boolean;
    /** Show video controls */
    controls?: boolean;
    /** Loop video */
    loop?: boolean;
    playsinline?: boolean;
}

export interface YoutubeAPI extends CommonAPI {
    cc_lang_pref?: string;
    cc_load_policy?: boolean;
    color?: "red" | "white";
    disablekb?: boolean;
    enablejsapi?: boolean;
    end?: number;
    fs?: boolean;
    hl?: string;
    iv_load_policy?: 1 | 3;
    listType?: "search" | "user_uploads" | "playlist";
    list?: string;
    modestbranding?: boolean;
    origin?: string;
    playlist?: string;
    rel?: boolean;
    start?: number;
    widget_referrer?: string;
}

export interface VimeoAPI extends CommonAPI {
    autopause?: boolean;
    background?: boolean;
    byline?: boolean;
    color?: string;
    dnt?: boolean;
    fun?: boolean;
    muted?: boolean;
    portrait?: boolean;
    quality?: "240p" | "360p" | "540p" | "720p" | "1080p" | "2k" | "4k";
    speed?: boolean;
    t?: string;
    texttrack?: string;
    title?: boolean;
    transparent?: boolean;
}
