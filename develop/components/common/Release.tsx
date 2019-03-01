import * as React from "react";
const releases = require("../../assets/releases.json");

interface ReleaseNotesModel {
    version: string;
    name: string;
    date: string;
    description?: string;
    important?: boolean;
    notes?: Array<{ title: string, note?: string }>;
}

interface ReleaseState {
    releases: Array<ReleaseNotesModel>;
}

export default class Release extends React.Component<any, ReleaseState>  {
    constructor(props: any) {
        super(props);

        this.state = {
            releases: []
        };
    }

    componentDidMount() {
        this.setState({ releases: releases });
    }

    render() {
        return (
            <div className="releases-page">
                <h2 className="title">Release notes</h2>
                <ul className="note-holder">
                    {this.state.releases.map((item, index) =>
                        <li className="item" key={index}>
                            <div className={"name " + (item.important ? "text-danger" : "")}>{item.name} <span>{item.version}</span></div>
                            <div className="date">{item.date}</div>
                            <div className="desc">{item.description}</div>
                            {item.notes && item.notes.length > 0 &&
                                <ul className="notes">
                                    {item.notes.map((noteItem, subIndex) =>
                                        <li key={subIndex} className="noteItems">
                                            <div className="note-title">{noteItem.title}</div>
                                            <div className="note-desc">{noteItem.note}</div>
                                        </li>
                                    )}
                                </ul>
                            }
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
