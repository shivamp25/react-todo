const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const element = React.createElement;

function newTodo() {
    ReactDOM.render(element(TodoApp, {flag: true}), list);
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: "",
            flag: this.props.flag
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.totalCount = this.totalCount.bind(this);
    }

    handleSubmit(value) {
        this.setState(function (prevState) {
            return {
                items: prevState.items.concat({
                    id: Math.random() + "",
                    item: value,
                    checked: false
                }),
                flag: false
            };
        },() => {
            this.totalCount();
        });
    }

    totalCount() {
        itemCountSpan.innerText = this.state.items.length;
    }

    componentWillReceiveProps(props) {
        this.setState({flag: props.flag});
    }

    render() {
        return element("div", null,
            this.state.items.map((item, index) => {
                    return element(TodoItem, {
                        key: index,
                        text: item,
                        index: index
                    })
                }
            ),
            this.state.flag ? element(addToDO, {handleSubmit: this.handleSubmit}) : false
        )
    }
}

function TodoItem(props) {
    return (
        element("li", {style: {position: 'relative'}, className: classNames.TODO_ITEM},
            element('span', {className: 'checkbox'},
                element('input', {type: 'checkbox'}
                )
            ),
            props.text.item
        )
    )
}

class addToDO extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const ENTER_KEY = 13;
        if (event.which === ENTER_KEY && event.target.value.length) {
            this.props.handleSubmit(document.getElementById('itemInput').value);
        }
    }

    render() {
        return (
            element('div', {
                    id: 'newTodo',
                    className: classNames.TODO_TEXT,
                },
                element('input', {
                    type: 'text',
                    id: 'itemInput',
                    placeholder: 'Add a new todo',
                    onKeyPress: this.onSubmit.bind(this)
                }),
            )
        )
    }

}