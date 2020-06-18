import React, { PureComponent } from 'react'
import { Dialog, DialogContent, Button } from '@material-ui/core'

export default class DialogBase extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { title, content, openDialog, handleCloseDialog, maxWidth, action } = this.props
        return (
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth={maxWidth}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="items-center justify-center flex-col flex py-32">
                    {title && <h2 className="color_blue font-bold my-16">{title}</h2>}
                    <h4 className="color_grey mb-12">{content}</h4>
                    <div className="flex flex-row w-full justify-between mt-24">
                        <Button
                            onClick={handleCloseDialog}
                            variant="contained"
                            className="flex flex-1 py-12 gradient_blue items-center justify-center text-white mr-40">
                            <h2 className="text_button_base">Hủy</h2>
                        </Button>
                        <Button
                            onClick={action}
                            variant="contained"
                            className="flex flex-1 py-12 items-center justify-center gradient_red text-white">
                            <h2 className="text_button_base">Xóa</h2>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}
