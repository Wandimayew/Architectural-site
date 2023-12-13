import React from 'react'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
const Example = () => {
  return (
    <div>
        <List>
            <ListItem>
                <ListItemPrefix>hll</ListItemPrefix>
                JJJJJ
                <Typography >gggggggg</Typography>
            </ListItem>
            <ListItem>
                <Popover>
                    <PopoverHandler>
                        <Typography >oooo</Typography>
                    </PopoverHandler>
                    <PopoverContent>
                        <div>

                    <Typography >hellow</Typography>
                        </div>
                    </PopoverContent>
                </Popover>
                <ListItemPrefix>hll</ListItemPrefix>
                JJJJJ
                <Typography >gggggggg</Typography>
            </ListItem>
        </List>
    </div>
  )
}

export default Example