import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon/index';
import Dialog, { ModalFuncProps } from './Modal';
import ActionButton from './ActionButton';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close: (...args: any[]) => void;
}

const IS_REACT_16 = !!ReactDOM.createPortal;

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { onCancel, onOk, close, zIndex, afterClose, visible, esc } = props;
  const iconType = props.iconType || 'hints-descriptions';
  const okType = props.okType || 'primary';
  const prefixCls = props.prefixCls || 'fishd-confirm';
  // 默认为 true，保持向下兼容
  const okCancel = ('okCancel' in props) ? props.okCancel! : true;
  const width = props.width || 416;
  const style = props.style || {};
  // 默认为 false，保持旧版默认行为
  const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  const okText = props.okText || '确定';
  const cancelText = props.cancelText || '取消';

  const classString = classNames(
    prefixCls,
    `${prefixCls}-${props.type}`,
    props.className,
  );

  const cancelButton = okCancel && (
    <ActionButton actionFn={onCancel} closeModal={close}>
      {cancelText}
    </ActionButton>
  );

  return (
    <Dialog
      className={classString}
      onCancel={close.bind(this, { triggerCancel: true })}
      visible={visible}
      title=""
      transitionName="fishd-modal-zoom"
      footer=""
      maskTransitionName=""
      maskClosable={maskClosable}
      style={style}
      width={width}
      zIndex={zIndex}
      afterClose={afterClose}
      esc={esc}
    >
      <div className={`${prefixCls}-body-wrapper`}>
        <div className={`${prefixCls}-body`}>
          <Icon type={iconType!} />
          <span className={`${prefixCls}-title`}>{props.title}</span>
          <div className={`${prefixCls}-content`}>{props.content}</div>
        </div>
        <div className={`${prefixCls}-btns`}>
          {cancelButton}
          <ActionButton type={okType} actionFn={onOk} closeModal={close} autoFocus>
            {okText}
          </ActionButton>
        </div>
      </div>
    </Dialog>
  );
};

export default function confirm(config: ModalFuncProps) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  function close(...args: any[]) {
    if (IS_REACT_16) {
      render({ ...config, close, visible: false, afterClose: destroy.bind(this, ...args) });
    } else {
      destroy(...args);
    }
  }

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmDialog {...props} />, div);
  }

  render({ ...config, visible: true, close });

  return {
    destroy: close,
  };
}
