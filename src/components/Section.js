import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { saveTodoLists } from "./saveTodoLists";
import { getTodoLists } from "./redux/reducers/getTodoListsPage";

import styles from "./css/section.module.css";
import walletIcon from "../assets/images/Wallet.svg";
import listIcon from "../assets/images/Todo Icon.svg";
import addIcon from "../assets/images/Add.svg";
import editIcon from "../assets/images/Edit.svg";
import backArrowIcon from "../assets/images/Close Edit.svg";

// #################################################################

const listTemp = {
  Id: "",
  todos: [],
};

const todosTemp = {
  id: "",
  title: "",
  description: "",
  isDone: false,
};

// #################################################################

function addNewList(allTodoLists, newListName) {
  let allTodoListsTemp = [];

  allTodoLists.forEach((list, index) => {
    allTodoListsTemp.push({
      Id: list.Id,
      todos: [],
    });

    let listIndex = index;

    list.todos.forEach((todo, index) => {
      allTodoListsTemp[listIndex].todos.push({
        id: todosTemp.id,
        title: todo.title,
        description: todo.description,
        isDone: todo.isDone,
      });
    });
  });

  allTodoListsTemp.push({
    Id: newListName,
    todos: [],
  });

  console.log(allTodoListsTemp);

  saveTodoLists(allTodoListsTemp);

  // return allTodoListsTemp;
}

// #################################################################

function allTodoListsMutable(allTodoLists, listId, itemId, title, desc) {
  let allTodoListsTemp = [];

  allTodoLists.forEach((list, index) => {
    allTodoListsTemp.push({
      Id: list.Id,
      todos: [],
    });

    let listIndex = index;

    list.todos.forEach((todo, index) => {
      if (listIndex === listId && itemId === index) {
        allTodoListsTemp[listIndex].todos.push({
          id: todosTemp.id,
          title: title,
          description: desc,
          isDone: todo.isDone,
        });
      } else {
        allTodoListsTemp[listIndex].todos.push({
          id: todosTemp.id,
          title: todo.title,
          description: todo.description,
          isDone: todo.isDone,
        });
      }
    });
  });

  // console.log(allTodoListsTemp);

  return allTodoListsTemp;
}

// #################################################################

function addNewListItem(allTodoLists, listId, title, desc) {
  let allTodoListsTemp = [];

  allTodoLists.forEach((list, index) => {
    allTodoListsTemp.push({
      Id: list.Id,
      todos: [],
    });

    let listIndex = index;

    list.todos.forEach((todo, index) => {
      allTodoListsTemp[listIndex].todos.push({
        id: todosTemp.id,
        title: todo.title,
        description: todo.description,
        isDone: todo.isDone,
      });
    });
  });

  allTodoListsTemp[listId].todos.push({
    id: "",
    title: title,
    description: desc,
    isDone: false,
  });

  console.log(allTodoListsTemp);

  saveTodoLists(allTodoListsTemp);

  // return allTodoListsTemp;
}

// #################################################################

function Section() {
  const dispatch = useDispatch();

  const addNewListRef = useRef("");
  const addNewItemRefs = useRef([]);

  const addItemRef = (ele) => {
    if (ele && !addNewItemRefs.current.includes(ele)) {
      addNewItemRefs.current.push(ele);
    }
  };

  const allTodoLists = useSelector((state) => state.todoLists?.data) || [];

  let listId, itemId;

  // #################################################################

  function addNewListName() {
    const addListBtn = addNewListRef.current;
    const newListName = addListBtn.parentElement.children[0];

    if (newListName.value !== "") {
      addNewList(allTodoLists, newListName.value);
      dispatch(getTodoLists());
      addListBtn.parentElement.children[0].value = "";
    } else {
      console.log("No List Name!");

      addListBtn.style.backgroundColor = "red";
      newListName.style.border = "2px solid red";

      setTimeout(() => {
        addListBtn.style.backgroundColor = "#353945";
        newListName.style.border = "2px solid transparent";
      }, 300);
    }
  }

  // #################################################################

  function addNewItemInList(index) {
    const addBtn = addNewItemRefs.current[index];

    const newTitle = addBtn.parentElement.children[0].children[1];
    const newDesc = addBtn.parentElement.parentElement.children[1].value;
    const newListId = addBtn.parentElement.parentElement.parentElement.id;

    console.log(addBtn);

    if (newTitle.value !== "") {
      addNewItem(newListId, newTitle.value, newDesc);
      addBtn.parentElement.children[0].children[1].value = "";
      addBtn.parentElement.parentElement.children[1].value = "";
    } else {
      console.log("No title");

      addBtn.style.backgroundColor = "red";
      newTitle.style.border = "2px solid red";

      setTimeout(() => {
        addBtn.style.backgroundColor = "#353945";
        newTitle.style.border = "2px solid transparent";
      }, 300);
    }
  }

  // #################################################################

  function openEdit(Id, todoId, title, desc) {
    document.querySelector("[data-edit-div]").style.display = "flex";
    document.querySelector("[data-edit-title]").value = title;
    document.querySelector("[data-edit-desc]").value = desc;
  }

  // #################################################################

  function editEventListener() {
    // #################################################################

    const editBtns = document.querySelectorAll("[data-edit-btn]");

    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        const Id = editBtn.parentElement.parentElement.parentElement.id;
        const todoId = editBtn.parentElement.parentElement.id;
        const title =
          editBtn.parentElement.parentElement.children[0].children[0]
            .children[1].innerHTML;
        const desc = editBtn.parentElement.parentElement.children[1].innerHTML;

        listId = Id;
        itemId = todoId;

        const editActives = document.querySelectorAll("[data-edit-active]");

        editActives.forEach((item) => {
          item.style.display = "none";
        });

        editBtn.parentElement.parentElement.children[2].style.display = "block";
        // console.log(Id, todoId, title, desc, "************");
        openEdit(Id, todoId, title, desc);
      });
    });

    // #################################################################

    // Edit save button event listener

    const editSaveBtn = document.querySelector("[data-edit-save-btn]");
    editSaveBtn.addEventListener("click", () => {
      const title = editSaveBtn.parentElement.children[1].value;
      const desc = editSaveBtn.parentElement.children[2].value;

      saveEdit(title, desc);
    });

    // #################################################################

    // Add new item event listener

    // const addItemBtns = document.querySelectorAll("[data-add-item]");
    // addItemBtns.forEach((addBtn) => {
    //   addBtn.addEventListener("click", () => {
    //     const newTitle = addBtn.parentElement.children[0].children[1].value;
    //     const newDesc = addBtn.parentElement.parentElement.children[1].value;
    //     const newListId = addBtn.parentElement.parentElement.parentElement.id;

    //     if (newTitle !== "" || newTitle !== null) {
    //       addNewItem(newListId, newTitle, newDesc);
    //       addBtn.parentElement.children[0].children[1].value = "";
    //       addBtn.parentElement.parentElement.children[1].value = "";
    //     } else {
    //       console.log("No title");
    //     }
    //   });
    // });
  }

  // #################################################################

  function closeEdit() {
    document.querySelector("[data-edit-div]").style.display = "none";

    const editActives = document.querySelectorAll("[data-edit-active]");

    editActives.forEach((item) => (item.style.display = "none"));
  }

  // #################################################################

  function saveEdit(title, desc) {
    const listIdInt = parseInt(listId);
    const itemIdInt = parseInt(itemId);

    let allTodoListsTemp = allTodoListsMutable(
      allTodoLists,
      listIdInt,
      itemIdInt,
      title,
      desc
    );

    // console.log(allTodoListsTemp);

    saveTodoLists(allTodoListsTemp);
    dispatch(getTodoLists());

    closeEdit();
  }

  // #################################################################

  function addNewItem(newListId, newTitle, newDesc) {
    addNewListItem(allTodoLists, newListId, newTitle, newDesc);

    dispatch(getTodoLists());

    // console.log(allTodoLists);
  }

  // #################################################################

  useEffect(() => {
    editEventListener();
  }, [allTodoLists]);

  // #################################################################

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionName}>Section</div>

        <div className={styles.sectionHeadInfo}>
          <div className={styles.walletIconDiv}>
            <img src={walletIcon} alt="Wallet" className={styles.walletIcon} />
          </div>
          <div className={styles.walletBalance}>0.2 $XYZ</div>
          <div className={styles.tier}>Tier 1</div>
        </div>
      </div>

      <div className={styles.sectionInfo}>
        <div className={styles.allTodoLists}>
          {allTodoLists.map((lists, index) => (
            <div className={styles.todoList} key={index} id={index}>
              <div className={styles.listHead}>List: {lists.Id}</div>

              <div className={styles.listItem}>
                <div className={styles.itemHead}>
                  <div className={styles.itemH12}>
                    <div className={styles.itemIconDiv}>
                      <img
                        src={listIcon}
                        alt="List"
                        className={styles.listIcon}
                      />
                    </div>

                    <input
                      placeholder="Add Todo"
                      className={styles.itemName}
                      data-new-item-title
                    />
                  </div>

                  <div
                    key={index}
                    ref={addItemRef}
                    onClick={() => addNewItemInList(index)}
                    className={styles.itemAddAction}
                    data-add-item
                  >
                    <img src={addIcon} alt="Add" className={styles.addIcon} />
                  </div>
                </div>

                <textarea
                  placeholder="Add Todo Description."
                  className={styles.itemDesc}
                  data-new-item-desc
                />
              </div>

              {lists.todos.map((list, index) => (
                <div className={styles.listItem} key={index} id={index}>
                  <div className={styles.itemHead}>
                    <div className={styles.itemH12}>
                      <div className={styles.itemIconDiv}>
                        <img
                          src={listIcon}
                          alt="List"
                          className={styles.listIcon}
                        />
                      </div>

                      <div className={styles.itemName}>{list.title}</div>
                    </div>

                    <div
                      className={styles.itemEditAction}
                      key="1"
                      data-edit-btn
                    >
                      <img
                        src={editIcon}
                        alt="Edit"
                        className={styles.editIcon}
                      />
                    </div>
                  </div>

                  <div className={styles.itemDesc}>{list.description}</div>
                  <div
                    style={{ display: "none" }}
                    className={styles.editActive}
                    data-edit-active
                  />
                </div>
              ))}
              <div className={styles.listEnd} />
            </div>
          ))}

          <div className={styles.addTodoList}>
            <input placeholder="Add Todo-List" className={styles.addListHead} />
            <div
              ref={addNewListRef}
              onClick={addNewListName}
              className={styles.itemAddAction}
              data-add-new-list
            >
              <img src={addIcon} alt="Add" className={styles.addIcon} />
            </div>
          </div>
        </div>

        <div
          style={{ display: "none" }}
          className={styles.editTodoListDiv}
          data-edit-div
        >
          <div className={styles.editHead}>
            <div onClick={closeEdit} className={styles.backArrowDiv}>
              <img
                src={backArrowIcon}
                alt="Close Edit"
                className={styles.backArrowIcon}
              />
            </div>
            <div className={styles.editHeadText}>Edit Todo</div>
          </div>

          <input type="text" className={styles.editTitle} data-edit-title />

          <textarea type="text" className={styles.editDesc} data-edit-desc />

          <div className={styles.editSaveBtn} data-edit-save-btn>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;