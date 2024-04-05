import React from 'react'
import { languages } from '../Components'
import { useState } from 'react'
import axios from 'axios'

import toast from 'react-hot-toast'
import { DownloadLogo, RetryLogo } from '../Image'



export const AudioToAudio = () => {
    const url = "http://127.0.0.1:8000"
    const [initial_lang, setInitial_lang] = useState("en")
    const [final_lang, setFinal_lang] = useState("bn")
    const [audiofile, setAudioFile] = useState("")
    const [final_text, setFinal_text] = useState("")
    const [audioSrc, setAudioSrc] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAudioFile(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAudioSrc(reader.result);
            };
        }
    };

    const translate = async () => {
        toast.loading("Translating...")
        if (audioSrc !== "" && audioSrc !== null) {
            try {
                const formData = new FormData();
                formData.append('input_data'
                    , audiofile);
                formData.append('initial', initial_lang);
                formData.append('finl', final_lang);
                console.log(formData);

                const data = await axios.post(url + "/audio-audio-response",
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    responseType: 'blob'
                })
                toast.dismiss()
                toast.success("Translated!")
                const blob = new Blob([data.data]);
                const audioUrl = URL.createObjectURL(blob);
                setFinal_text(audioUrl);
            }
            catch (e) {
                toast.dismiss()
                toast.error(e.message)
                setFinal_text(e.message)
            }
        }
        else {
            toast.dismiss()
            toast.error("Please upload Audio to translate")
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
                            <div className="audio-input-container line">
                                <div className="center">
                                    {audioSrc && (
                                        <div className="audio-preview">
                                            <audio controls src={audioSrc}></audio>
                                        </div>
                                    )}
                                    <input type="file" className="audio-input" accept="audio/wav" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className='final-audio-div'>
                                <audio controls src={final_text}>
                                </audio>
                                <div className="utilities">
                                    <div className="doenload">
                                        <button><img src={DownloadLogo} alt="" /></button>
                                    </div>
                                    <div className="retry">
                                        <button><img src={RetryLogo} alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
