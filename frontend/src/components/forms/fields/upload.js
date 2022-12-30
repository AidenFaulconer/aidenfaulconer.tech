import React, { useState } from 'react';

export const UploadInput = ({
  name,value,type,icon,placeholder,required,max,allos , ...props
}) => {
  // hooks
  const ref = React.useRef();
  const [_input,setInput] = useState([0])
//   const [input, setInput] = useFormStore(formName, fieldName, [], validateType || 'file');
  // properties
  const getFileName = /[^/]*$/;

  // methods
  const handleInput = React.useCallback((e) => {
    // go through all the files and check the type of file, and file size is under 3mb and there is no more than 3 files
    const files = e?.target ? [...e.target.files] : Object.keys(e).map((f) => e[f]);
    if (files) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
      const fileSize = 5242880;
      const maxFiles = 3;
      const fileCount = files.length;
      if (fileCount > maxFiles || input.length > maxFiles) {
        alert('You can only upload a maximum of 3 files');
        return;
      }
      for (let i = 0; i < files.length; i += 1) {
        if (fileTypes.indexOf(files[i].type) === -1) {
          alert(`File type not supported for ${files[i].name}, use ${fileTypes.map((type) => type).join(', ')}`);
          return;
        }
        if (files[i].size > fileSize) {
          alert(`File size for ${files[i].name} is too large (Maximum file size is 5MB)`);
          return;
        }
      }
      setInput(files);
    }
  }, [ref]);

//   const generateFileTags = React.useCallback(() => {
//     if (input.length > 0) {
//       return input.map((file) => (
//         <ItemTag key={file.name} style={{ zIndex: 10 }}>
//           {/* <AFIcon type="close" onClick={() => setInput(input.filter((item) => item !== file))} /> */}
//           {`  ${file.name}`}
//         </ItemTag>
//       ));
//     }
//   }, [input]);

  return (
    <label htmlFor="upload-photos">
      <button
          // allow users to drag and drop files on this button
        {...props}
        className="flex flex-nowrap flex-row h-28 mb-8"
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData('text/plain', 'anything')}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const { files } = e.dataTransfer;
          handleInput(files);
        }}
          // call file dialog in input
        onClick={(e) => {
          ref.current.click();
        }}
      >
        <input
          onChange={handleInput}
          ref={ref}
          type="file"
          id="upload-photo"
          name="upload-photo"
          hidden
          multiple
        />
        {/* {generateFileTags()} */}
        {_input.length === 0 && label}
      </button>
    </label>
  );
}

export default UploadInput