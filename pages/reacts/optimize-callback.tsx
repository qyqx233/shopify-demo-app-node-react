import React, { useState, useRef, useCallback, useEffect, useReducer } from 'react'

const ExpensiveTree = React.memo(function ({ onClick }) {
  console.log('Render ExpensiveTree')
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while (Date.now() - dateBegin < 600) { }

  useEffect(() => {
    console.log('Render ExpensiveTree --- DONE')
  })

  return (
    <div onClick={onClick}>
      <p>很重的组件，不优化会死的那种</p>
    </div>
  )
})

function Index() {
  const [text, updateText] = useState('Initial value');
  const textRef = useRef(text);

  const handleSubmit = useCallback(() => {
    console.log(`Text: ${textRef.current}`);
  }, [textRef]);

  useEffect(() => {
    console.log('update text')
    textRef.current = text;
  }, [text])


  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      <ExpensiveTree onClick={handleSubmit} />
    </>
  )
}

function reducer(state, action) {
  switch(action.type) {
      case 'update':
          return action.preload;
      case 'log':
          console.log(`Text: ${state}`)
          return state;     
  }
}

const ExpensiveTreeDispatch = React.memo(function (props) {
  console.log('Render ExpensiveTree')
  const { dispatch } = props;
  const dateBegin = Date.now();
  // 很重的组件，不优化会死的那种，真的会死人
  while(Date.now() - dateBegin < 600) {}

  useEffect(() => {
      console.log('Render ExpensiveTree --- DONE')
  })

  return (
      <div onClick={() => { dispatch({type: 'log' })}}>
          <p>很重的组件，不优化会死的那种</p>
      </div>
  )
});

function Index1() {
  const [text, dispatch] = useReducer(reducer, 'Initial value');

  return (
      <>
          <input value={text} onChange={(e) => dispatch({
              type: 'update', 
              preload: e.target.value
          })} />
          <ExpensiveTreeDispatch dispatch={dispatch} />
      </>
  )
}

export default Index