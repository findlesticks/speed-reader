import React, { Component } from "react";
import Reader from "../Reader/";

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
    this.nextWord = this.nextWord.bind(this);
    this.initTexts = this.initTexts.bind(this);
    this.extractText = this.extractText.bind(this);
    this.getInput = this.getInput.bind(this);
    this.nextBreak = this.nextBreak.bind(this);
    this.getBreaks = this.getBreaks.bind(this);
  }

  extractText(text) {
    if (!text) {
      
    }
    let paras;
    let words;
    if (text.props && text.props.children) {
      console.log(text.props.children);
      paras = text.props.children.map(para => {
        return para.props.children.length;
      });
      words = text.props.children.reduce(
        (oldArr, para) => oldArr.concat(para.props.children.split(/\s+/)),
        []
      );
    } else {
      paras = text.split(/\n/).map(string => string.length);
      words = text.split(/\s+/);
    }

    return {
      words: words,
      breaks: paras
    };
  };

  initTexts(text, abstract) {
    return {
      text: this.extractText(text),
      abstract: this.extractText(abstract)
    };
  };
  getInput() {
    const { inputs, input } = this.state;
    return inputs[input]
      ? inputs[input].words
      : ["Incorrect flag in input: " + input];
  };
  getBreaks() {
    const { inputs, input } = this.state;
    return inputs[input] ? inputs[input].breaks : [0];
  };
  nextWord(ev) {
    const { word, playing, wps } = this.state;

    let nextWord = Math.min(this.getInput().length, word + 1);
    if (nextWord === this.getInput().length) nextWord = 0;
    this.setState({ word: nextWord });

    if (playing) {
      this.timeoutInd = setTimeout(this.nextWord, 1000 / wps);
    }
  };
  nextBreak(ev) {
    const { word, wps, playing } = this.state;
    const breaks = this.getBreaks();
    let nextBreak = 0;
    let i = 0;
    do {
      nextBreak += breaks[i];
      i++;
    } while (nextBreak < word);

    this.setState({ word: nextBreak });
  };
  onKeyDown(ev) {
    if (ev.code === "Space") {
      this.setState({ playing: !this.state.playing });
    } else if (ev.code === "ArrowUp") {
      this.setState({ wps: this.state.wps + 1 });
    } else if (ev.code === "ArrowDown") {
      this.setState({ wps: Math.max(1, this.state.wps - 1) });
    } else if (ev.code === "ArrowRight") {
      this.nextBreak();
    }
  };

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
          <p>playing: {playing ? "true" : "false"}</p>
        </div>
        <Reader word={renderWord} />
      </div>
    );
  }
}

export default App;
