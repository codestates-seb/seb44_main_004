import { MutableRefObject, useMemo, memo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosInstance } from '../../api/axios';

type QuillEditorProps = {
  quillRef: MutableRefObject<ReactQuill | null>;
  contentValue: string | undefined;
  setContentValue: (content: string) => void;
};

const QuillEditor = memo(({ quillRef, contentValue, setContentValue }: QuillEditorProps) => {
  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    const { VITE_AUTH_KEY } = import.meta.env;

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('curationImage', file[0]);

        try {
          const response = await axiosInstance.post(
            'http://localhost:8080/curations/images/upload',
            formData,
            {
              headers: {
                Authorization: `${VITE_AUTH_KEY}`,
              },
            }
          );
          const imageUrl = response.data.imageUrl;

          const range = quillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = quillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src="${imageUrl}" alt="curation image tag." />`
            );
          }
          return { ...response, success: true };
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

  return (
    <>
      <style>
        {`
          .ql-toolbar {
            border: none !important;
            border-radius: 0.3rem 0.3rem 0rem 0rem;
            background-color: #f8f7f7;
          }
          .ql-container.ql-snow {
            border: none !important;
            border-radius: 0rem 0rem 0.3rem 0.3rem;

            background-color: #f8f7f7;
            height: 18.75rem;
          }
          .ql-editor .ql-placeholder {
            font-style: normal;
          }
        `}
      </style>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        value={contentValue}
        onChange={setContentValue}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="큐레이션의 내용을 입력해 주세요"
        style={{
          fontWeight: '100',
          marginBottom: '0.3rem',
          backgroundColor: '#f8f7f7',
          border: 'none',
          borderRadius: '0.3rem',
          height: '18.75rem',
        }}
      />
    </>
  );
});

export default QuillEditor;
