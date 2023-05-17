import React,{useRef,useState} from 'react';
import { ImageConfig } from './config/ImageConfig'; 
import uploadImg from './assets/cloud-upload-regular-240.png';
import './drop-file-input.css';

function Attachment({onFileChange}){
    const [fileList, setFileList] = useState([]);
    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const list= e.target.files.length;
        let newFile=0;
        let combine=[];
        for (let i = 0; i < list; i++) {
            newFile = e.target.files[i];
            combine.push(newFile);

        }
        setFileList(combine.concat(fileList));
        onFileChange(combine.concat(fileList));
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }


    return(
    <>
        <center>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{maxWidth:'100%'}}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} multiple/>
            </div>
        </center>

        {
            fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">
                        Ready to upload
                    </p>
                    {
                        fileList.map((item, index) => (
                            <div key={index} className="drop-file-preview__item">
                                <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                <div className="drop-file-preview__item__info">
                                    <p>{item.name}</p>
                                    <p>{item.size}B</p>
                                </div>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                            </div>
                        ))
                    }
                </div>
            ) : null
        }
    </>
    )
}

export default Attachment;