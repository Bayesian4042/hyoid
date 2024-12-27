import { Button, Drawer, Flex, Input, message, Space, Typography, Upload, UploadProps } from "antd"
import Logo from "~/components/ui/Logo"
import { CiFileOn } from "react-icons/ci";
import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { FileInputProps, KnowledgeBaseDrawerProps, TextInputProps, UrlInputProps } from "~/types/common";



const KnowledgeBaseDrawer:React.FC<KnowledgeBaseDrawerProps> = ({open,setOpen}) => {
    const [selected,setSelected] = useState("file")
    const[url,setUrl] = useState<string>("")
    const[name,setName] = useState<string>("");
    const[content,setContent] = useState<string>("");
    const[file,setFile] = useState<File|null>(null)
  return (
    <Drawer width={600} open={open} onClose={()=> setOpen(false)} title={<Flex gap='small' align='center'><Logo logo={<CiFileOn size={20}/>}/> <h3>Add Knowledge Base Item</h3></Flex>}>
      <Flex vertical justify="space-between" className="h-[calc(100vh-119px)]">
        <div>
        <Typography.Title level={5}>item type</Typography.Title>
        <Flex gap='small'>
            <Button className="w-full" onClick={() =>setSelected("file")}>File</Button>
            <Button className="w-full" onClick={() =>setSelected("url")}>Url</Button>
            <Button className="w-full" onClick={() =>setSelected("text")}>Text</Button>
        </Flex>
        <div>
            {selected === "file" ? <FileInput file={file} setFile={setFile}  />:selected === "url" ? <UrlInput url={url} setUrl={setUrl}/> : <TextInput name={name} setName={setName} content={content} setContent={setContent}/>}
        </div>
        </div>
        <Flex justify="flex-end" gap={10}>
            <Button>Cancle</Button>
            <Button variant="solid" color="default">Add item</Button>
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
        <p className="mt-2 mb-4">
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
            <p>Specify a URL where the knowledge base is hosted (For example, a documentation website). The URL will be scraped and its text content will be passed to the LLM alongside the prompt.</p>
            <h1 className="font-bold">Text Name</h1>
            <Input value={url} onChange={e => setUrl(e.target.value)}/>
        </Space>
    )
}

const TextInput:React.FC<TextInputProps> = ({name,setName,content,setContent}) => {
   
    return (
        <Flex vertical justify="space-between">
        <Space className="w-full mt-2" direction="vertical">
        <p>Enter raw text directly to be passed to the LLM alongside the prompt.</p>
       <h1 className="font-bold">Text Name</h1>
       <Input value={name} onChange={e => setName(e.target.value)}/>
       <h1 className="font-bold">Text Content</h1>
       <Input.TextArea autoSize={{ minRows: 3, maxRows: 9 }} value={content} onChange={e => setContent(e.target.value)}/>
        </Space>
        </Flex>
    )
}
