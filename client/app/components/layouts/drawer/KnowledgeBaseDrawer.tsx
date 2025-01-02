import { Button, Drawer, Flex, Input, message, Space, Typography, Upload, UploadProps } from "antd"
import EmojiAvatar from "~/components/ui/EmojiAvatar"
import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { FileInputProps, KnowledgeBaseDrawerProps, TextInputProps, UrlInputProps } from "~/types/common";
import { useLocation } from "@remix-run/react";
import SelectorOption from "~/components/ui/SelectorOption";
import SubmitButton from "~/components/ui/SubmitButton";

const KnowledgeBaseDrawer:React.FC<KnowledgeBaseDrawerProps> = ({open,setOpen}) => {
    const {pathname} = useLocation()  
    const [selectedOption,setSelectedOption] = useState("file")
    const[options,setOptions] = useState(["file","url","text"])
    const[url,setUrl] = useState<string>("")
    const[name,setName] = useState<string>("");
    const[content,setContent] = useState<string>("");
    const[file,setFile] = useState<File|null>(null)

    const handleSubmit = () => {
      if(!content){
        message.error("Please Enter text first")
        return;
      }
      setContent("")
    }

  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><EmojiAvatar pathname={pathname}/> <h3>Add Knowledge Base Item</h3></Flex>}>
      <Flex vertical justify="space-between" className="h-[calc(100vh-129px)]">
        <div>
        <div className="mb-5">
        <SelectorOption selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options}/>
        </div>
        <div>
            {selectedOption === "file" ? <FileInput file={file} setFile={setFile}  />:selectedOption === "url" ? <UrlInput url={url} setUrl={setUrl}/> : <TextInput name={name} setName={setName} content={content} setContent={setContent}/>}
        </div>
        </div>
        <Flex className="mb-20 px-20" gap={10} align="center" justify="space-between">
          <SubmitButton text="Add Item"/>
          <Button variant="outlined" color="danger" className="text-xl rounded-3xl px-10 py-5">Cancle</Button>
          </Flex>
      </Flex>
    </Drawer>
  )
}

export default KnowledgeBaseDrawer


const FileInput:React.FC<FileInputProps> = ({ file, setFile }) => {
    const props: UploadProps = {
      name: "file",
      multiple: false,
      beforeUpload: (file) => {
        setFile(file);
      },
      onChange(info) {
        const { file } = info;
        if (file.status === "removed") {
          setFile(null);
        }
      },
      onDrop(event) {
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
          const droppedFile = droppedFiles[0]; 
          setFile(droppedFile);
        }
      },
    };
  
    return (
      <div>
        <p className="mt-2 mb-4 text-gray-500">
          Upload files that will be passed to the LLM alongside the prompt.
        </p>
        <Upload.Dragger style={{ backgroundColor: "white" }} {...props}>
          <Flex gap="large" align="center">
            <div className="bg-gray-100 p-5 rounded-full">
              <LuUpload size={20} />
            </div>
            <div>
              <h1 className="font-bold">Click or drag files to upload</h1>
            </div>
          </Flex>
        </Upload.Dragger>
      </div>
    );
  };

const UrlInput:React.FC<UrlInputProps> = ({url,setUrl}) => {
    return (
        <Space className="w-full mt-2" direction="vertical">
            <p className="text-gray-500">Specify a URL where the knowledge base is hosted (For example, a documentation website). The URL will be scraped and its text content will be passed to the LLM alongside the prompt.</p>
            <h1 className="font-bold">Text Name</h1>
            <Input value={url} onChange={e => setUrl(e.target.value)}/>
        </Space>
    )
}

const TextInput:React.FC<TextInputProps> = ({name,setName,content,setContent}) => {
   
    return (
        <Flex vertical justify="space-between">
        <Space className="w-full mt-2" direction="vertical">
        <p className="text-gray-500">Enter raw text directly to be passed to the LLM alongside the prompt.</p>
       <h1 className="font-bold">Text Name</h1>
       <Input value={name} onChange={e => setName(e.target.value)}/>
       <h1 className="font-bold">Text Content</h1>
       <Input.TextArea autoSize={{ minRows: 3, maxRows: 9 }} value={content} onChange={e => setContent(e.target.value)}/>
        </Space>
        </Flex>
    )
}
