import React, { Component } from "react";
import Reader from "../Reader";
import ToggleButtons, { TYPES } from "../toggleButton";
import Controls from "../controls";
import Highlights from "../Highlights";
import ProgressBar from "../ProgressBar";

let timeoutInd;
let playToggleFlagTimeout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      wps: 6,
      word: -1,
      input: TYPES.TEXT,
      inputs: this.initTexts(props.text, props.abstract),
      highlight: false,
      playToggleFlag: false,
      spaceDown: false
    };

    this.extractText = this.extractText.bind(this);
    this.initTexts = this.initTexts.bind(this);
    this.getInput = this.getInput.bind(this);
    this.getBreaks = this.getBreaks.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.nextBreak = this.nextBreak.bind(this);
    this.prevBreak = this.prevBreak.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInput = this.setInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.startHighlight = this.startHighlight.bind(this);
    this.endHighlight = this.endHighlight.bind(this);
    this.getHighlights = this.getHighlights.bind(this);
    this.addHighlight = this.addHighlight.bind(this);
    this.spaceDown = this.spaceDown.bind(this);
    this.spaceUp = this.spaceUp.bind(this);
    this.togglePlaying = this.togglePlaying.bind(this);
    this.speedUp = this.speedUp.bind(this);
    this.slowDown = this.slowDown.bind(this);
  }

  extractText(text) {
    let paras;
    let words;
    if (text) {
      paras = text.split(/\./).map(para => {
        return para.split(/\s+/).length;
      });
      words = text.split(/\s+/).concat("FIN");
    }

    return {
      words: words,
      breaks: paras,
      highlights: []
    };
  }

  initTexts(text, abstract) {
    return {
      [TYPES.TEXT]: this.extractText(text),
      [TYPES.ABSTRACT]: this.extractText(abstract)
    };
  }
  getInput() {
    const { inputs, input } = this.state;
    return inputs[input]
      ? inputs[input].words
      : ["Incorrect flag in input: " + input];
  }
  getBreaks() {
    const { inputs, input, highlight } = this.state;
    return inputs[input] ? inputs[input].breaks : [0];
  }
  nextWord(ev) {
    const { word, playing, wps, highlight } = this.state;

    const nextWord = word + 1;
    if (this.getInput().length - 1 < nextWord) {
      this.setState({ playing: false });
    } else {
      this.setState({ word: nextWord });
    }

    if (playing) {
      timeoutInd = setTimeout(this.nextWord, 1000 / wps);
    }
    if (highlight) {
      this.addHighlight(nextWord);
    }
  }
  nextBreak(ev) {
    const { word } = this.state;
    const breaks = this.getBreaks();
    let nextBreak = 0;
    let i = 0;
    do {
      nextBreak += breaks[i];
      i++;
    } while (nextBreak < word);

    this.setState({ word: nextBreak });
  }
  prevBreak(ev) {
    const { word } = this.state;
    const breaks = this.getBreaks();
    let nextBreak = 0;
    let i = 0;
    while (nextBreak + breaks[i] < word) {
      nextBreak += breaks[i];
      i++;
    }

    this.setState({ word: nextBreak });
  }

  startHighlight() {
    this.setState({ highlight: true });
    this.addHighlight(this.state.word);
  }
  endHighlight() {
    this.setState({ highlight: false });
  }
  getHighlights() {
    const { inputs, input } = this.state;
    return inputs[input] ? inputs[input].highlights : [];
  }
  addHighlight(word) {
    const { inputs, input } = this.state;
    const highlight = inputs[input] ? inputs[input].highlights : [];
    if (highlight.indexOf(word) === -1) {
      highlight.push(word);
      this.setState({
        inputs: Object.assign({}, inputs, {
          highlights: highlight
        })
      });
    }
  }
  togglePlaying() {
    this.setState({ playing: !this.state.playing });
  }

  spaceDown() {
    if (!this.state.spaceDown) {
      this.setState({ spaceDown: true, playToggleFlag: true });

      if (playToggleFlagTimeout) clearTimeout(playToggleFlagTimeout);
      playToggleFlagTimeout = setTimeout(() => {
        this.setState({ playToggleFlag: false, playing: true });
        this.startHighlight();
      }, 100);
    }
  }
  spaceUp() {
    if (playToggleFlagTimeout) clearTimeout(playToggleFlagTimeout);
    if (this.state.playToggleFlag) this.togglePlaying();
    this.endHighlight();

    this.setState({ spaceDown: false });
  }

  speedUp() {
    this.setState({ wps: this.state.wps + 1 });
  }
  slowDown() {
    this.setState({ wps: Math.max(1, this.state.wps - 1) });
  }
  onKeyDown(ev) {
    if (ev.code === "Space") {
      this.spaceDown();
    } else if (ev.code === "ArrowUp") {
      this.speedUp();
    } else if (ev.code === "ArrowDown") {
      this.slowDown();
    } else if (ev.code === "ArrowRight") {
      this.nextBreak();
    } else if (ev.code === "ArrowLeft") {
      this.prevBreak();
    }
  }
  onKeyUp(ev) {
    if (ev.code === "Space") {
      this.spaceUp();
    }
  }

  setInput(type) {
    this.setState({
      input: type,
      word: 0
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    this.nextWord();
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    if (timeoutInd) clearTimeout(timeoutInd);
  }
  componentDidUpdate(props, state) {
    if (this.state.playing !== state.playing)
      if (this.state.playing) this.nextWord();
      else if (timeoutInd) clearTimeout(timeoutInd);

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
    const highlights = this.getHighlights();
    const renderWord = chosenInput[word];

    return (
      <div>
        <h1>{this.props.title}</h1>
        <ToggleButtons setInput={this.setInput} inputType={this.state.input} />
        <div>
          <p>Debugger:</p>
          <p>wps: {wps}</p>
          <p>word: {word}</p>
          <p>playing: {playing ? "true" : "false"}</p>
        </div>

        <Reader word={renderWord} highlight={highlights.indexOf(word) !== -1} />

        <Controls
          togglePlaying={this.togglePlaying}
          playing={this.state.playing}
          speedUp={this.speedUp}
          slowDown={this.slowDown}
          wps={this.state.wps}
        />

        {!playing ? (
          <div>
            <ProgressBar
              text={chosenInput}
              highlights={highlights}
              currentWord={word}
            />
            <Highlights text={chosenInput} highlights={highlights} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
