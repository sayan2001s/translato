import React from 'react'
import { languages } from '../Components'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const TextToText = () => {
    const url = process.env.REACT_APP_FASTAPI_URL
    const [initial_lang, setInitial_lang] = useState("en")
    const [final_lang, setFinal_lang] = useState("bn")
    const [initial_text, setInitial_text] = useState("")
    const [final_text, setFinal_text] = useState("")
    const translate = async () => {
        toast.loading("Translating...")
        if (initial_text !== "" && initial_text !== null) {
            try {
                const { data } = await axios.post(url + "/text-response",
                    {
                        'initial': initial_lang,
                        'finl': final_lang,
                        'text': initial_text
                    })
                toast.dismiss()
                toast.success("Translated!")
                setFinal_text(data)
            }
            catch (e) {
                toast.dismiss()
                toast.error(e.message)
                setFinal_text(e.message)
            }
        }
    }
    return (
        <div>

            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <div className="container">
                    <div className="translator_poperty">
                        <div className="nuv_item">
                            <div>
                                <select id="initial_select"
                                    name="initial" className="btn-shadow"
                                    onChange={(e) => {
                                        setInitial_lang(e.target.value)
                                    }}
                                    value={initial_lang}
                                >
                                    {languages.map((value, key) => {
                                        return (
                                            <option key={key} value={value.code}>{value.language}</option>
                                        )
                                    })}
                                </select>

                            </div>
                            <div
                                id="transfer"
                                className="bx bx-transfer"
                                onClick={(e) => {
                                    let templang = initial_lang
                                    setInitial_lang(final_lang)
                                    setFinal_lang(templang)
                                }}
                            ></div>
                            <div>
                                <select id="final_select" name="final" className="btn-shadow"
                                    onChange={(e) => {
                                        setFinal_lang(e.target.value)
                                    }}
                                    value={final_lang}>
                                    {languages.map((value, key) => {
                                        return (
                                            <option key={key} value={value.code}>{value.language}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button onClick={() => {
                                setFinal_text("Loading...")
                                translate()
                            }} className="btn-submit">Translate</button>
                        </div>
                        <div className="text-area">
                            <div className="write_box">
                                <textarea id="initial" className="line" placeholder="Write down" name="from"
                                    onChange={(e) => {
                                        setInitial_text(e.target.value)
                                    }}

                                    value={initial_text}></textarea>
                            </div>
                            <div>
                                <textarea id="final" className="toTranslate" name="to" disabled placeholder="Translated" value={final_text}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
