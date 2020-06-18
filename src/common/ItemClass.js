import React, { PureComponent } from 'react'
import { ListItem, Divider, Checkbox } from '@material-ui/core'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

export default class ItemClass extends PureComponent {
    render() {

        const { item, onClick } = this.props
        return (
            <ListItem className="pl-0" onClick={onClick} button>
                <Checkbox
                    type="checkbox"
                    checked={item.check ? true : false}
                />
                <div className="flex flex-1 flex-row  items-center">
                    <img alt="noti" className="w-32 h-32 mr-12 rounded-full" src="assets/images/patterns/rain.png" />
                    <h4>{item.classId}</h4>
                </div>
            </ListItem>
        )
    }
}
