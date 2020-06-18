import React, { PureComponent } from 'react'
import { ListItem, Divider } from '@material-ui/core'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

export default class ItemNotification extends PureComponent {
    render() {

        const { item } = this.props
        var time = ""
        if (item.createDate) {
            time = formatDistanceToNow(parseISO(item.createDate), { includeSeconds: true, locale: vi })
        }
        return (
            <div className="flex flex-col">
                <ListItem className="pl-24 pr-24" button>
                    <img alt="noti" className="w-64 h-64 rounded-full" src="assets/images/patterns/rain.png" />
                    <div className="ml-12 flex flex-col justify-center">
                        <h4 className="">{item.body}</h4>
                        <h5 className="text-xs mb-8">{time}</h5>
                    </div>
                </ListItem>
                <Divider light />
            </div>
        )
    }
}
