import {
    LINK_OPEN_INFO_ORDER,
    MODAL_INFO_ORDER_CLOSE,
    MODAL_INFO_ORDER_OPEN
} from "../constants";
import { TClickOrder } from "../../utils/types";


export interface IInfoOrderOpenAction {
    readonly type: typeof MODAL_INFO_ORDER_OPEN;
    readonly order: TClickOrder
}

export interface IInfoOrderCloseAction {
    readonly type: typeof MODAL_INFO_ORDER_CLOSE
}

export interface ILinkOpenInfoOrderAction {
    readonly type: typeof LINK_OPEN_INFO_ORDER;
    readonly order: TClickOrder
}

export type TOrdersActions =
    | IInfoOrderOpenAction
    | IInfoOrderCloseAction
    | ILinkOpenInfoOrderAction;

export const infoOrderOpenAction = (order: TClickOrder): IInfoOrderOpenAction => ({
    type: MODAL_INFO_ORDER_OPEN,
    order
})

export const infoOrderCloseAction = (): IInfoOrderCloseAction => ({
    type: MODAL_INFO_ORDER_CLOSE
})

export const linkOpenInfoOrderAction = (order: TClickOrder): ILinkOpenInfoOrderAction => ({
    type: LINK_OPEN_INFO_ORDER,
    order
})