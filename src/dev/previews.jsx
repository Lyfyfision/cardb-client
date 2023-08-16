import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Carlist from "../components/Carlist";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Carlist">
                <Carlist/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews