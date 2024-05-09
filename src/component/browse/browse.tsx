// Browse.tsx
import React, { useEffect, useRef, useState } from 'react';
import './browse.css'; // Create a corresponding CSS file for styling
import * as ABB from '@abb/abb-common-ux-react'
import Chat from 'component/chat/chat';
import TextBox from 'component/textBox/textBox';
import jsonData from 'component/languageTranslator/languages/english.json';

interface BrowseFileProps {
    selectedDepartment: string | null;
}

const BrowseFile: React.FC<BrowseFileProps> = ({ selectedDepartment }) => {
    const scrollAndChatRef = useRef<HTMLDivElement>(null);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState<boolean>(false);
    const [isUploadClicked, setIsUploadClicked] = useState<boolean>(false);
    const [isSelectedFileCount, setIsSelectedFileCount] = useState<number>(0);
    const [isSelectedFileName, setIsSelectedFileName] = useState<string[]>([]);;
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [suggestedQuestions, setSuggestedQuestions] = useState<{ department: string, questions: string[] }[]>([]); // State to hold suggested questions
    const [currentQuestionSlide, setCurrentQuestionSlide] = useState<number>(0);

    useEffect(() => {
        const element = scrollAndChatRef.current;
        if (element) {
            setIsScrollbarVisible(element.scrollHeight > element.clientHeight);
            scrollAndChatRef.current.scrollTop = scrollAndChatRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleFileUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
            const fileLists = Array.from(files)
            const fileNames = fileLists.map(file => file.name);
            setIsSelectedFileName(fileNames);
            setIsSelectedFileCount(files.length);
            setIsUploadClicked(false);
        }
    };

    const handleUploadButton = () => {
        const botMessages = messages.filter(message => message.sender === 'bot');
        setMessages(botMessages);
        // Handle upload button click logic here
        setIsUploadClicked(true);
        // Call function to get suggested questions
        getSuggestedQuestions();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        handleFileUpload(files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFileUpload(files);
    };

    useEffect(() => {
        setCurrentQuestionSlide(0); // Resetting to the first slide when selectedDepartment changes
    }, [selectedDepartment]);

    const handleMessageSubmit = (message: string) => {
        setMessages([...messages, { text: message, sender: 'user' }]);
        // Here you might also send the message to a server or perform any other action
    };

    const getSuggestedQuestions = () => {
        const allQuestions = Object.entries(jsonData.translateData.suggestedQuestions)
                                   .map(([department, questions]) => ({department, questions}));
        setSuggestedQuestions(allQuestions);
        setCurrentQuestionSlide(0);
    };

    const departmentQuestions = selectedDepartment
    ? suggestedQuestions.find((department) => department.department === selectedDepartment)
    : null;

    const questionsPerPage = 4;
    const totalPages = Math.ceil((departmentQuestions?.questions.length || 0) / questionsPerPage);

    const paginatedQuestions = departmentQuestions 
    ? departmentQuestions.questions.slice(currentQuestionSlide * questionsPerPage, (currentQuestionSlide + 1) * questionsPerPage) 
    : [];

    const handleNextPage = () => {
        setCurrentQuestionSlide(currentSlide => currentSlide + 1);
    };

    const handlePrevPage = () => {
        setCurrentQuestionSlide(currentSlide => currentSlide - 1);
    };

    return (
        <div>
            <div ref={scrollAndChatRef} className={`scrollBrowseAndChat ${isScrollbarVisible ? 'scrollbarVisible' : ''}`}>
                <div 
                    className="browseBox"
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop}
                >
                    <label htmlFor="fileInput" className="browseFile">
                        <ABB.Icon 
                            className="abbIcon"
                            name="abb/new-document" 
                            sizeClass="large" 
                        />
                        <span>Browse files (Max 10MB)</span>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept={'.doc, .pdf'}
                        multiple={true}
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />

                    <div className={`${isSelectedFileCount === 0 ?  "browseRequest" : "hidden" }` }>
                        Please browse your document(s) <br/>
                        (.pdf, .docx formats only)
                    </div>

                    <div className={`${isSelectedFileCount === 0 ? "hidden" : "selectedFileCount" }` }>
                        {isUploadClicked ? 
                            `${isSelectedFileCount} file(s) uploaded` : 
                            `${isSelectedFileCount} file(s) selected`
                        } 
                        <br />
                        {!isUploadClicked && "Please click on upload"}
                    </div>
                    
                    <button 
                        className={`uploadButton ${isSelectedFileCount > 0 && !isUploadClicked ? "enabled" : ""}`}
                        onClick={handleUploadButton}
                    >
                        Upload
                    </button>
                
                    {isSelectedFileName.length > 0 && (
                        <div className="selectedFileName">
                            <h3>Selected files:</h3>
                            {isSelectedFileName.map((fileNames, index) => (
                                <span key={index}>
                                    {`${index+1}.) ${fileNames}`}
                                </span>
                            ))}
                        </div>
                    )} 
                </div>

                {paginatedQuestions.length > 0 && (
                    <div className="suggestedQuestionsBox">
                        <h3>Suggested Questions to ask ABBoT for {departmentQuestions?.department}:</h3>
                        {paginatedQuestions.map((question, index) => (
                            <button 
                                className="questionsButton"
                                key={index}
                            >
                                {question}
                            </button>
                        ))}
                        <div>
                            <button 
                                disabled={currentQuestionSlide === 0} 
                                onClick={handlePrevPage}
                                className="previousSuggestions"
                            >
                                Previous Suggestions
                            </button>
                            <span className="slideNumber">
                                {`Slide ${currentQuestionSlide + 1} of ${totalPages}`}
                            </span>
                            <button 
                                disabled={currentQuestionSlide === totalPages - 1} 
                                onClick={handleNextPage}
                                className="nextSuggestions"
                            >
                                Next Suggestions
                            </button>
                        </div>
                    </div>
                )}

                <Chat messages={messages} />
            </div>

            {isUploadClicked && <TextBox onMessageSubmit={handleMessageSubmit} />}

        </div>
    );
};

export default BrowseFile;
