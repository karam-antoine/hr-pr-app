'use client';

import React, { useState } from 'react';
import {
  QuestionnaireDTO,
  SectionDTO,
  SectionQuestionDTO,
} from '@/types/questionnaire';
import { Form, Card, Button } from 'react-bootstrap';
import classes from './Questionnaire.module.scss';
import { QuestionTypes, SectionTypes } from '@/types/enums';

interface Props {
  questionnaire: QuestionnaireDTO;
}

type AnswersState = {
  [sqId: string]: number | string;
};

export default function QuestionnaireClient({ questionnaire }: Props) {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [objectives, setObjectives] = useState<
    { description: string; kpi: string }[]
  >([{ description: '', kpi: '' }]);

  const onRatingChange = (sqId: string, value: number) => {
    setAnswers((a) => ({ ...a, [sqId]: value }));
  };

  const onTextChange = (sqId: string, value: string) => {
    setAnswers((a) => ({ ...a, [sqId]: value }));
  };

  const addObjective = () => {
    setObjectives((o) => [...o, { description: '', kpi: '' }]);
  };

  const onObjectiveChange = (
    idx: number,
    field: 'description' | 'kpi',
    value: string
  ) => {
    setObjectives((o) =>
      o.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    // TODO: call your save API
    console.log('Saving answers:', answers, objectives);
  };
  const handleSubmit = () => {
    // TODO: call your submit API
    console.log('Submitting:', answers, objectives);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2>{questionnaire.name}</h2>
        <div>
          <Button variant="outline-secondary" onClick={handleSave}>
            Save Draft
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {questionnaire.sections?.map((section: SectionDTO) => (
        <Card key={section.id} className={classes.sectionCard}>
          <Card.Header>
            <h3>{section.title}</h3>
          </Card.Header>
          <Card.Body>
            {section.type === SectionTypes.QUESTIONS ? (
              <Form>
                {section.sectionQuestions.map((sq: SectionQuestionDTO) => (
                  <div key={sq.id} className={classes.questionRow}>
                    <Form.Label className={classes.questionText}>
                      {sq.question.text}
                    </Form.Label>
                    {sq.question.type === QuestionTypes.RatingScale ? (
                      <div className={classes.radioGroup}>
                        {[1, 2, 3, 4].map((val) => (
                          <Form.Check
                            inline
                            key={val}
                            type="radio"
                            name={sq.id}
                            id={`${sq.id}-${val}`}
                            label={val}
                            checked={answers[sq.id] === val}
                            onChange={() => onRatingChange(sq.id, val)}
                          />
                        ))}
                      </div>
                    ) : (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={(answers[sq.id] as string) || ''}
                        onChange={(e) => onTextChange(sq.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </Form>
            ) : (
              <div className={classes.objectivesSection}>
                {objectives.map((obj, idx) => (
                  <div key={idx} className={classes.objectiveRow}>
                    <Form.Control
                      placeholder={`Objective #${idx + 1}`}
                      className={classes.objectiveInput}
                      value={obj.description}
                      onChange={(e) =>
                        onObjectiveChange(idx, 'description', e.target.value)
                      }
                    />
                    <Form.Control
                      placeholder="KPI"
                      className={classes.kpiInput}
                      value={obj.kpi}
                      onChange={(e) =>
                        onObjectiveChange(idx, 'kpi', e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button variant="link" onClick={addObjective}>
                  + Add Objective
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
