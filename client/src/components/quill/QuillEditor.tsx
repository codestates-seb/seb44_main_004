import { MutableRefObject, useMemo, memo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { axiosInstance } from '../../api/axios';
import { customAlert } from '../../components/alert/sweetAlert';

type QuillEditorProps = {
  quillRef: MutableRefObject<ReactQuill | null>;
  contentValue: string | undefined;
  setContentValue: (content: string) => void;
};

const QuillEditor = memo(({ quillRef, contentValue, setContentValue }: QuillEditorProps) => {
  const imageHandler = async () => {
    const input = document.createElement('input');
    const formData = new FormData();
    const { VITE_AUTH_KEY } = import.meta.env;
  
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    const file = await new Promise<File | null>((resolve) => {
      input.onchange = () => {
        if (input.files !== null) {
          resolve(input.files[0]);
        } else {
          resolve(null);
        }
      };
    });

    const maxSize = 2 * 1024 * 1024;
    if (file && file.size > maxSize) {
      customAlert({
        title: '이미지 파일 사이즈를 확인해주세요!',
        text: '이미지 파일은 2MB 이하로만 등록 가능합니다 :)',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#F1C93B',
      });
      return;
    }
  
    if (file) {
      formData.append('curationImage', file);

      try {
        const response = await axiosInstance.post('/curations/images/upload',
          formData,
          {
            headers: {
              Authorization: `${VITE_AUTH_KEY}`,
            },
          }
        );
        const imageUrl = response.data.imageUrl;

        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection()?.index;
        if (range !== null && range !== undefined) {
          editor?.insertEmbed(range, 'image', imageUrl);
        }
        return { ...response, success: true };
      } catch (error) {
        console.error(error);
      }
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
        const clipboardData = e.clipboardData as DataTransfer;
        if (clipboardData.types.includes('Files')) {
          e.preventDefault();
          customAlert({
            title: '이미지 붙여넣기는 지원되지 않아요',
            text: '이미지 버튼을 눌러 업로드 해주세요',
            icon: 'warning',
            confirmButtonText: '확인',
            confirmButtonColor: '#F1C93B',
          });
        } else {
          const textData = clipboardData.getData('text/plain');
          if (textData) {
            const selection = editor.getSelection();
            if (selection) {
              e.preventDefault();
            }
          }
        }
      };

      editor.clipboard.addMatcher('br', (node, delta) => {
        return delta;
      });

      editor.root.addEventListener('paste', handlePaste as unknown as EventListener);

      return () => {
        editor.root.removeEventListener('paste', handlePaste as unknown as EventListener);
      };
    }
  }, [quillRef, setContentValue]);
  
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
        ref={(element: ReactQuill | null) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="큐레이션의 내용을 입력해 주세요"
        value={contentValue}
        onChange={setContentValue}
      />
    </>
  );
});

export default QuillEditor;