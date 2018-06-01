import React, { Component } from "react";
import Reader from "../Reader";

let timeoutInd;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      wps: 6,
      word: -1,
      input: "text",
      inputs: this.initTexts(props.text, props.abstract)
    };

    this.extractText = this.extractText.bind(this);
    this.initTexts = this.initTexts.bind(this);
    this.getInput = this.getInput.bind(this);
    this.getBreaks = this.getBreaks.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.nextBreak = this.nextBreak.bind(this);
    this.prevBreak = this.prevBreak.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  extractText(text) {
    let paras;
    let words;
    if (text && text.props && text.props.children) {
      console.log(text.props.children);
      paras = text.props.children.map(para => {
        return para.props.children.split(/\s+/).length;
      });
      words = text.props.children
        .reduce(
          (oldArr, para) =>
            oldArr.concat(para.props.children.split(/\s+/), [""]),
          []
        )
        .concat("END");
    }

    return {
      words: words,
      breaks: paras
    };
  }

  initTexts(text, abstract) {
    return {
      text: this.extractText(text),
      abstract: this.extractText(abstract)
    };
  }
  getInput() {
    const { inputs, input } = this.state;
    return inputs[input]
      ? inputs[input].words
      : ["Incorrect flag in input: " + input];
  }
  getBreaks() {
    const { inputs, input } = this.state;
    return inputs[input] ? inputs[input].breaks : [0];
  }
  nextWord(ev) {
    const { word, playing, wps } = this.state;

    const nextWord = Math.min(this.getInput().length - 1, word + 1);
    this.setState({ word: nextWord });

    if (playing) {
      this.timeoutInd = setTimeout(this.nextWord, 1000 / wps);
    }
  }
  nextBreak(ev) {
    const { word } = this.state;
    const breaks = this.getBreaks();
    let nextBreak = 0;
    let i = 0;
    do {
      nextBreak += breaks[i] + 1;
      i++;
    } while (nextBreak < word);

    this.setState({ word: nextBreak });
  }
  prevBreak(ev) {
    const { word } = this.state;
    const breaks = this.getBreaks();
    let nextBreak = 0;
    let i = 0;
    while (nextBreak + breaks[i] + 1 < word) {
      nextBreak += breaks[i] + 1;
      i++;
    }

    this.setState({ word: nextBreak });
  }
  onKeyDown(ev) {
    if (ev.code === "Space") {
      this.setState({ playing: !this.state.playing });
    } else if (ev.code === "ArrowUp") {
      this.setState({ wps: this.state.wps + 1 });
    } else if (ev.code === "ArrowDown") {
      this.setState({ wps: Math.max(1, this.state.wps - 1) });
    } else if (ev.code === "ArrowRight") {
      this.nextBreak();
    } else if (ev.code === "ArrowLeft") {
      this.prevBreak();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    this.nextWord();
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    if (this.timeoutInd) clearTimeout(this.timeoutInd);
  }
  componentDidUpdate(props, state) {
    if (this.state.playing !== state.playing)
      if (this.state.playing) this.nextWord();
      else if (this.timeoutInd) clearTimeout(this.timeoutInd);

    if (
      this.props.text !== props.text ||
      this.props.abstract !== props.abstract
    ) {
      this.setState({ inputs: this.initTexts(props.text, props.abstract) });
    }
  }

  render() {
    const { word, wps, playing } = this.state;
    const chosenInput = this.getInput();
    const renderWord = chosenInput[word];

    return (
      <div>
        <div>
          <p>Debugger:</p>
          <p>wps: {wps}</p>
          <p>word: {word}</p>
          <p>playing: {playing ? "true" : "false"}</p>
        </div>
        <Reader word={renderWord} />
      </div>
    );
  }
}

export default App;
