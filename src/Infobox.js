import React from 'react';
import { CardContent, Card, Typography } from '@material-ui/core';

function Infobox({title , cases, total}) {
    return (
        <div>
            <Card>
                <CardContent cardName = "Infobox">

                <Typography cardName = "Infobox_title" color="textSecondary"> {title}</Typography>

                <h2 cardName = "Infobox_cases">{cases} </h2>

                <Typography cardName = "Infobox_total" color="textSecondary"> {total} </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default Infobox
