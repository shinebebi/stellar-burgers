import {ingredientsReducer} from "./ingredient";
import {
    getIngredientsAction,
    getIngredientsFailedAction,
    getIngredientsSuccessAction, linkOpenAction, modalCloseAction, modalOpenAction
} from "../../actions/burger-ingredients";

const state = {
    isLoading: false,
    hasError: false,
    data: [],

    modalIngredientOpen: false,
    ingredientDetails: undefined,
    linkIngredientOpen: false
}

export const testData = [
    {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
    }
]

describe('ingredient reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(state)
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        const action = getIngredientsAction()
        const newState = ingredientsReducer(state, action)
        expect(newState.isLoading).toBe(true)
        expect(newState.hasError).toBe(false)
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = getIngredientsSuccessAction(testData)
        const newState = ingredientsReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.data).toBe(testData)
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        const action = getIngredientsFailedAction()
        const newState = ingredientsReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(true)
    })
    it('should handle MODAL_INGREDIENT_OPEN', () => {
        const action = modalOpenAction(testData[0])
        const newState = ingredientsReducer(state, action)
        expect(newState.ingredientDetails).toBe(testData[0])
        expect(newState.modalIngredientOpen).toBe(true)
    })
    it('should handle MODAL_INGREDIENT_CLOSE', () => {
        const action = modalCloseAction()
        const newState = ingredientsReducer(state, action)
        expect(newState.modalIngredientOpen).toBe(false)
        expect(newState.ingredientDetails).toBe(undefined)
    })
    it('should handle LINK_INGREDIENT_OPEN', () => {
        const action = linkOpenAction(testData[0])
        const newState = ingredientsReducer(state, action)
        expect(newState.linkIngredientOpen).toBe(true)
        expect(newState.ingredientDetails).toBe(testData[0])
    })
})