// Browse.tsx
import React, { useEffect, useRef, useState } from 'react';
import './browse.css'; // Create a corresponding CSS file for styling
import * as ABB from '@abb/abb-common-ux-react'
import Chat from 'component/chat/chat';
import TextBox from 'component/textBox/textBox';
import context from 'component/translator/languages/english.json';

interface BrowseFileProps {
    selectedDepartment: string | null;
    translate: (key: string) => string;
}

const BrowseFile: React.FC<BrowseFileProps> = ({ selectedDepartment, translate }) => {
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
            element.scrollTop = element.scrollHeight;
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

    const handleQuestionButtonClick = (question: string) => {
        handleMessageSubmit(question);
    };

    const getSuggestedQuestions = () => {
        const allQuestions = Object.entries(context.translateData.suggestedQuestions)
                                   .map(([department, questions]) => ({department, questions}));
        setSuggestedQuestions(allQuestions);

        // Scroll to the bottom
        setTimeout(() => {
            if (scrollAndChatRef.current) {
                scrollAndChatRef.current.scrollTop = scrollAndChatRef.current.scrollHeight;
            }
        }, 100); // Timeout to wait for the chat to render before scrolling
    };

    const departmentQuestionsSelection = selectedDepartment
    ? suggestedQuestions.find((department) => department.department === selectedDepartment)
    : null;

    const questionsPerPage = 4;
    const totalPages = Math.ceil((departmentQuestionsSelection?.questions.length || 0) / questionsPerPage);

    const paginatedQuestions = departmentQuestionsSelection 
    ? departmentQuestionsSelection.questions.slice(currentQuestionSlide * questionsPerPage, (currentQuestionSlide + 1) * questionsPerPage) 
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
                        <span> {translate("translateData.browse.browseFiles")} </span>
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
                        {translate("translateData.browse.browseRequest")} <br />
                        {translate("translateData.browse.browseRequestFormat")}
                    </div>

                    <div className={`${isSelectedFileCount === 0 ? "hidden" : "selectedFileCount" }` }>
                        {isSelectedFileCount + " "}
                        {isUploadClicked ? 
                            translate("translateData.browse.fileUploaded") : 
                            translate("translateData.browse.fileSelected")
                        } 
                        <br />
                        { !isUploadClicked && translate("translateData.browse.clickOnUpload") } 
                    </div>
                    
                    <button 
                        className="uploadButton"
                        disabled={isSelectedFileCount === 0 || isUploadClicked}
                        onClick={handleUploadButton}
                    >
                        {translate("translateData.browse.upload")}
                    </button>
                
                    {isSelectedFileName.length > 0 && (
                        <div className="selectedFileName">
                            <h3> {translate("translateData.browse.selectedFiles")} </h3>
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
                        <h3> 
                            {translate("translateData.browse.suggestionRequest")} 
                            {selectedDepartment}:
                        </h3>
                        
                        <div className="questionsBox">
                            {paginatedQuestions.map(( _ , questionBoxIndex ) => {
                                const questionJsonIndex = currentQuestionSlide * questionsPerPage + questionBoxIndex; // Calculate the actual index of the question
                                const questionAfterLanguageChange = translate(`translateData.suggestedQuestions.${selectedDepartment}.${questionJsonIndex}`); // Get the question in the current language
                                return (    
                                    <button 
                                        className="questionsButton"
                                        key={questionBoxIndex}
                                        onClick={() => handleQuestionButtonClick(questionAfterLanguageChange)}
                                    >
                                        {questionAfterLanguageChange}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <div className="navigateSuggestions">
                            <button 
                                className="previousSuggestions"
                                disabled={currentQuestionSlide === 0} 
                                onClick={handlePrevPage}
                            >
                                {translate("translateData.browse.navigateSuggestions.prevSuggestions")} 
                            </button>

                            <span className="slideNumber">
                                {translate("translateData.browse.navigateSuggestions.slide")}
                                {` ${currentQuestionSlide + 1} / ${totalPages}`}
                            </span>

                            <button 
                                className="nextSuggestions"
                                disabled={currentQuestionSlide === totalPages - 1} 
                                onClick={handleNextPage}
                            >
                                {translate("translateData.browse.navigateSuggestions.nextSuggestions")} 
                            </button>
                        </div>
                    </div>
                )}

                <Chat messages={messages} />
            </div>

            {isUploadClicked && <TextBox onMessageSubmit={handleMessageSubmit} translate={translate}/>}

        </div>
    );
};

export default BrowseFile;
