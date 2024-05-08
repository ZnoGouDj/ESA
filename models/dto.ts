import { Dimensions } from "./common"

interface IFleet {
    singleShipDimensions: Dimensions,
    shipCount: number,
    shipDesignation: string
}

export interface IFleets {
    anchorageSize: Dimensions,
    fleets: IFleet[]
}