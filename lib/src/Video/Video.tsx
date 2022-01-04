import React from "react";
import classnames from "classnames";
import { VideoProps, Mapper, YoutubeAPI, VimeoAPI, MapperItem } from "./types-definition";
import { vimeoKeysMapper, youtubeKeysMapper } from "./api-mapper";
import "./video.scss";

/** A video component is an React component for playing videos */
export const Video: React.FC<VideoProps> = (props: VideoProps) => {
    const [src, setSrc] = React.useState<string>("");
    const vimeoVideoPrefix: string = "vimeo";

    const formatParams = React.useCallback(
        (props) => {
            let newSrc: string = `${props.src}?html5=1`;
            const keysMapper: Partial<Mapper<YoutubeAPI> | Mapper<VimeoAPI>> = newSrc.toLowerCase().indexOf(vimeoVideoPrefix) > -1 ? vimeoKeysMapper : youtubeKeysMapper;
            const listOfPropKeys: Array<string> = Object.keys(props);
            let newParams: string = "";
            Object.keys(keysMapper)
                .filter((item: string) => listOfPropKeys.indexOf(item) > -1 && props[item] !== null && props[item] !== undefined)
                .map((item: string) => {
                    const mapper: MapperItem<YoutubeAPI | VimeoAPI> = keysMapper[item];
                    mapper.keys.map((key: string) => {
                        newParams += `${mapper.conjunctionSymbol || "&"}${key}=${
                            mapper.values && mapper.values.oldValue === props[item] ? mapper.values.newValue : typeof props[item] === "boolean" ? (props[item] ? 1 : 0) : props[item]
                        }`;
                    });
                });
            newSrc += newParams;
            setSrc(newSrc);
        },
        [props]
    );

    React.useEffect(() => {
        formatParams(props);
    }, [props]);

    return (
        <div className={classnames("rc", "video-holder-component", props.className)} id={props.id}>
            <iframe title={props.title} src={src} height={props.height} width={props.width} allowFullScreen={props.allowFullScreen} name={props.name} frameBorder={0} />
        </div>
    );
};
