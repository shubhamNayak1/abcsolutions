import React, { useState } from 'react';
import Card from '../../../components/card/card';
import './examAction.css';
import { useNavigate } from 'react-router-dom';
import SearchableTable from '../../../components/table/searchableTable';
import DialogBox from '../../../components/dialogBox/dialogBox';

const ExamAction: React.FC = () => {
  const navigate = useNavigate();

  const backToTraining = () => {
    navigate('../training/create');
  };

  const [addNewQuestion, setAddNewQuestion] = useState(false);
  const [addExistingQuestion, setExistingLocation] = useState(false);

  const handleAddQuestionOpen = (input: string) => {
    if (input === 'new') {
      setAddNewQuestion(true);
    } else {
      setExistingLocation(true);
    }
  };

  const handleAddNewQuestionClose = () => {
    setAddNewQuestion(false);
  };

  const handleAddExistingQuestionClose = () => {
    setExistingLocation(false);
  };

  const handleAddQuestionSave = () => {
    handleAddNewQuestionClose();
  };

  const handleExistingQuestionSave = () => {
    handleAddExistingQuestionClose();
  };

  const columns = [
    'Question',
    'Option1',
    'Option2',
    'Option3',
    'Option4',
    'CorrectOption',
    'Status',
  ];
  const columnLabels = {
    Question: 'Question',
    Option1: 'Option 1',
    Option2: 'Option 2',
    Option3: 'Option 3',
    Option4: 'Option 4',
    CorrectOption: 'Correct Option',
    Status: 'Status',
  };

  const data = [
    {
      Question: 'Question 1',
      Option1: 'a',
      Option2: 'b',
      Option3: 'c',
      Option4: 'd',
      CorrectOption: 'b',
      Status: 'reviewed',
    },
    {
      Question: 'Question 2',
      Option1: 'a',
      Option2: 'b',
      Option3: 'c',
      Option4: 'd',
      CorrectOption: 'a',
      Status: 'reviewed',
    },
    {
      Question: 'Question 3',
      Option1: 'a',
      Option2: 'b',
      Option3: 'c',
      Option4: 'd',
      CorrectOption: 'c',
      Status: 'Not reviewed',
    },
    {
      Question: 'Question 4',
      Option1: 'a',
      Option2: 'b',
      Option3: 'c',
      Option4: 'd',
      CorrectOption: 'd',
      Status: 'reviewed',
    },
  ];

  const columnsExisting = ['Question', 'options', 'CorrectOption'];

  const columnExistingLabels = {
    Question: 'Question',
    options: 'Options',
    CorrectOption: 'Correct Option',
  };

  const dataExsisting = [
    { Question: 'Question 1', options: 'a,b,c,d', CorrectOption: 'b' },
    { Question: 'Question 2', options: 'a,b,c,d', CorrectOption: 'a' },
    { Question: 'Question 3', options: 'a,b,c,d', CorrectOption: 'c' },
    { Question: 'Question 4', options: 'a,b,c,d', CorrectOption: 'd' },
  ];

  return (
    <>
      <div className="examAction">
        <div className="header-band">Create Exam</div>
        <Card>
          <div className="createExamActionHeader">Exam Add</div>
          <div className="createExamActionBody">
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Exam Name</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Exam ( Minutes )</div>
              <div>
                <input type="text" name="examMinutes" id="examMinutes" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Marks</div>
              <div>
                <input type="text" name="marks" id="marks" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Pass Marks</div>
              <div>
                <input type="text" name="passMarks" id="passMarks" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Add Question</div>
              <div className="addQuestionButton">
                <button onClick={() => handleAddQuestionOpen('new')}> Add New Question</button>
                <button
                  className="addNewQuestionButton"
                  onClick={() => handleAddQuestionOpen('old')}
                >
                  {' '}
                  Add Existing Question
                </button>
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Total No of Question</div>
              <div>
                <input type="text" name="totalQ" id="totalQ" value="" />
              </div>
            </div>
            <div className="saveButtonExamAction">
              <div className="closeButtonExamAction">
                <button onClick={backToTraining}> Back </button>
              </div>
              <div>
                <button> Save </button>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
        </Card>
        <DialogBox
          isOpen={addNewQuestion}
          onClose={handleAddNewQuestionClose}
          onSave={handleAddQuestionSave}
          title={'Add New Question'}
        >
          <div className="createExamActionBody">
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Question</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Option 1</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Option 2</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Option 3</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Option 4</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
            <div className="createExamActionBodyrow">
              <div className="createExamActionBodyrowlabel">Correct option</div>
              <div>
                <input type="text" name="examName" id="examName" value="" />
              </div>
            </div>
          </div>
        </DialogBox>
        <DialogBox
          isOpen={addExistingQuestion}
          onClose={handleAddExistingQuestionClose}
          onSave={handleExistingQuestionSave}
          title={'Add Existing Question'}
        >
          <div className="createExamActionBody">
            <SearchableTable
              columnLabels={columnExistingLabels}
              columns={columnsExisting}
              data={dataExsisting}
            />
          </div>
        </DialogBox>
      </div>
    </>
  );
};

export default ExamAction;
