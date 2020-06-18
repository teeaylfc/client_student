import React, { PureComponent } from 'react'
import DropMenu from '../app/sign-up/DropMenu'

export default class InputDropDown extends PureComponent {

    render() {
        const { title, list, chooseAction, widthDrop, width, color, className, hint, value, currentItem } = this.props
        return (
            <div className={`flex flex-row items-center ${className ? className : ""}`} style={{ width: width }}>
                <h4 className="color_grey mr-16 font-600">
                    {title}
                </h4>
                <DropMenu
                    width={widthDrop}
                    list={list}
                    chooseItem={chooseAction ? chooseAction : null}
                    value={value}
                    // name
                    currentItem={currentItem ? currentItem : null}
                    hint={hint ? hint : ""}
                />
            </div>
        )
    }
}
