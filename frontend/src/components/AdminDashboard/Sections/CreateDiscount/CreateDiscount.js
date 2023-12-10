import "./CreateDiscount.css"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as discountActions from "../../../../store/discount"
import * as discountCategoryActions from "../../../../store/discountcategory"
import CategorySection from "../../ReusableSections/CategorySection"

function CreateDiscount() {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [type, setType] = useState("percent")
    const [value, setValue] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [categories, setCategories] = useState({})

    const [currCats, setCurrCats] = useState({})

    // function to handle radio button clicking for discount type
    const handleRadioClick = (type, e) => {
        e.stopPropagation()
        setType(type)
    }

    const handleCategorySelection = (updatedCategories) => {
        setCategories(updatedCategories)
    }

    const handleAllCategorySelection = () => {
        const categoryUpdater = { ...currCats }
        if (categoryUpdater["All"]) {
            delete categoryUpdater["All"]
        } else {
            categoryUpdater["All"] = true
        }
        setCurrCats(categoryUpdater)
        setCategories(categoryUpdater)
    }

    const handleSubmit = () => {
        const newDiscount = {
            discountName: name,
            discountType: type,
            discountValue: value,
            expirationDate: expirationDate
        }

        dispatch(discountActions.addDiscountThunk(newDiscount)).then(res => {
            dispatch(discountCategoryActions.addDiscountCategoryThunk(res.data.id, Object.keys(categories)))
        })
    }

    return (
        <form onSubmit={() => handleSubmit()} className="create-container">
            <section>Create a New Discount</section>

            <section>
                <section>
                    <section>Discount Code Name</section>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                    />
                </section>

                <section>
                    <section>Discount Type</section>
                    <section>
                        <input
                            type="radio"
                            id="type-percent"
                            checked={type === "percent"}
                            onClick={(e) => handleRadioClick("percent", e)}
                        />
                        <label htmlFor={`type-percent`} onClick={(e) => {
                            e.preventDefault()
                            handleRadioClick("percent", e)
                        }}>
                            Percent
                        </label>

                        <input
                            type="radio"
                            id="type-flat"
                            checked={type === "flat"}
                            onClick={(e) => handleRadioClick("flat", e)}
                        />
                        <label htmlFor={`type-flat`} onClick={(e) => {
                            e.preventDefault()
                            handleRadioClick("flat", e)
                        }}>
                            Flat Discount
                        </label>
                    </section>
                </section>

                <section>
                    <section>Discount Value</section>
                    <input
                        type="number"
                        max={type === "percent" ? 100 : undefined}
                        required
                        onChange={(e) => setValue(e.target.value)}
                    />
                </section>

                <section>
                    <section>Expiration Date</section>
                    <input
                        type="date"
                        required
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </section>
            </section>

            <section id="category-section">
                <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
            </section>

            <section>
                <label htmlFor={`all-discount`} onChange={() => {
                    handleAllCategorySelection()
                }}
                >Apply this discount to all products</label>
                <input
                    type="checkbox"
                    id="all-discount"
                    checked={currCats["All"]}
                    onChange={() => { handleAllCategorySelection() }}
                />
            </section>

            <section id="save-changes-container">
                <button type="submit" className="pointer save-changes-button">Create New Discount</button>
                <button type="button" className="pointer cancel-changes-button" onClick={() => setCurrCats({})}>Clear</button>
            </section>
        </form >
    )
}

export default CreateDiscount