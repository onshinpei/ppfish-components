import notification from '../Notification.tsx';

describe('Notification.placement', () => {
  afterEach(() => notification.destroy());

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function getStyle(el, prop, getComputedStyle, style) {
    getComputedStyle = getComputedStyle || window.getComputedStyle;
    style = getComputedStyle ? getComputedStyle(el) : el.currentStyle;

    // If a css property's value is `auto`, it will return an empty string.
    return prop ? style[prop] : style;
  }

  function open(args) {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      ...args,
    });
  }

  function config(args) {
    notification.config({
      ...args,
    });
    open();
  }

  it('change notification placement by `open` method', () => {
    const defaultTop = '24px';
    const defaultBottom = '24px';
    let style;

    // topLeft
    open({
      placement: 'topLeft',
    });
    style = getStyle($$('.fishd-notification-topLeft')[0]);
    expect(style.top).toBe(defaultTop);
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('');

    open({
      placement: 'topLeft',
    });
    expect($$('.fishd-notification-topLeft').length).toBe(1);


    // topRight
    open({
      placement: 'topRight',
    });
    style = getStyle($$('.fishd-notification-topRight')[0]);
    expect(style.top).toBe(defaultTop);
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('');

    open({
      placement: 'topRight',
    });
    expect($$('.fishd-notification-topRight').length).toBe(1);


    // bottomRight
    open({
      placement: 'bottomRight',
    });
    style = getStyle($$('.fishd-notification-bottomRight')[0]);
    expect(style.top).toBe('');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe(defaultBottom);

    open({
      placement: 'bottomRight',
    });
    expect($$('.fishd-notification-bottomRight').length).toBe(1);


    // bottomLeft
    open({
      placement: 'bottomLeft',
    });
    style = getStyle($$('.fishd-notification-bottomLeft')[0]);
    expect(style.top).toBe('');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe(defaultBottom);

    open({
      placement: 'bottomLeft',
    });
    expect($$('.fishd-notification-bottomLeft').length).toBe(1);
  });

  it('change notification placement by `config` method', () => {
    let style;

    // topLeft
    config({
      placement: 'topLeft',
      top: 50,
      bottom: 50,
    });
    style = getStyle($$('.fishd-notification-topLeft')[0]);
    expect(style.top).toBe('50px');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('');

    // topRight
    config({
      placement: 'topRight',
      top: 100,
      bottom: 50,
    });
    style = getStyle($$('.fishd-notification-topRight')[0]);
    expect(style.top).toBe('100px');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('');

    // bottomRight
    config({
      placement: 'bottomRight',
      top: 50,
      bottom: 100,
    });
    style = getStyle($$('.fishd-notification-bottomRight')[0]);
    expect(style.top).toBe('');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('100px');

    // bottomLeft
    config({
      placement: 'bottomLeft',
      top: 100,
      bottom: 50,
    });
    style = getStyle($$('.fishd-notification-bottomLeft')[0]);
    expect(style.top).toBe('');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('50px');
  });
  it('change notification mountNode by `config` method', () => {
    const $container = document.createElement('div');
    document.body.appendChild($container);
    config({
      top: 50,
      bottom: 100,
      getContainer() {
        return $container;
      },
    });
    expect($container.querySelector('.fishd-notification')).not.toBe(null);
    $container.remove();
  });
});
