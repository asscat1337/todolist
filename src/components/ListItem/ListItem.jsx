import styles from './ListItem.module.scss'

function ListItem({name,complete,id,onRemoveItem,onComplete}){
    const onRemove = ()=>{
        onRemoveItem(id)
    }
    const onCompleteTask = ()=>{
        onComplete(id)
    }
    return (
        <div className={`${styles.todo} ${complete ? styles.complete : ''}`}>
            <div className="todo__item-check">
                <input type="checkbox" className="todo__item-check" onClick={onCompleteTask}/>
            </div>
            <p>{name}</p>
            <div className={styles.removeItem}>
                <button className="button-remove__item" onClick={onRemove}>
                    <img src="/delete.png" alt="Удалить"/>
                </button>
            </div>
        </div>
    )
}
export default ListItem
