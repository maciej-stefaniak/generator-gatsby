import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { isBrowser } from './../../utils/index.js';

class Portal extends React.Component {

  constructor(props) {
    super(props)

    if (isBrowser) {
      this.element = document.createElement('div')
    }
  }

  componentDidMount() {
    const { rootId } = this.props
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    const modalRoot = document.getElementById(rootId)
    if (modalRoot) {
      modalRoot.appendChild(this.element)
    }
  }

  componentWillUnmount() {
    const { rootId } = this.props
    const modalRoot = document.getElementById(rootId)
    if (modalRoot) {
      modalRoot.removeChild(this.element)
    }
  }

  render() {
    if (isBrowser) {
      return ReactDOM.createPortal(this.props.children, this.element)
    }

    return null
  }
}

export default Portal