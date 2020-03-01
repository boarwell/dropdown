type clickHandler = (child: Dropdown) => void;

class Dropdown {
  private trigger: HTMLElement;
  private container: HTMLElement;

  constructor(
    trigger: HTMLElement,
    container: HTMLElement,
    onClick: clickHandler
  ) {
    trigger.onclick = () => onClick(this);
    this.trigger = trigger;
    this.container = container;
  }
  open() {
    // TODO:
    console.log(this.trigger, this.container, 'open()');
  }

  close() {
    // TODO:
    console.log(this.trigger, 'close()');
  }
}

type State = { name: 'open'; current: Dropdown } | { name: 'closed' };

export type Prop = Readonly<{ trigger: HTMLElement; container: HTMLElement }>;

export class Commander {
  private items: Dropdown[];
  private state: State = { name: 'closed' };

  constructor(props: Readonly<Prop[]>) {
    const onClickHandler = this.onClick.bind(this);
    this.items = props.map(
      ({ trigger, container }) =>
        new Dropdown(trigger, container, onClickHandler)
    );
  }

  onClick(clicked: Dropdown) {
    console.log('Parent.onClick, state ->', this.state);

    switch (this.state.name) {
      case 'open':
        const { current } = this.state;
        current.close();
        if (current === clicked) {
          // TODO: 親側でアコーディオン（閉じる）のアニメーション
          // -> onOpen みたいなコールバック関数を受け取って
          // 具体的な「どの要素の高さをああして……」の処理はその中に書く
          this.state = { name: 'closed' };
        } else {
          clicked.open();
          this.state = { name: 'open', current: clicked };
        }
        return;

      case 'closed':
        // TODO: 親側でアコーディオン（開く）のアニメーション
        // -> onOpen みたいなコールバック関数を受け取って
        // 具体的な「どの要素の高さをああして……」の処理はその中に書く
        clicked.open();
        this.state = { name: 'open', current: clicked };
        return;

      default:
        const unknownState: never = this.state;
        throw new Error(`${unknownState} is not properly handled`);
    }
  }
}
