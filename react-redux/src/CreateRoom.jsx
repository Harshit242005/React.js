import React, {useState} from 'react'
import styles from './Styles/InterfaceButtons.module.css';
function CreateRoom() {
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
        {openDialog &&
                <div>
                    {/* here would come the room id which creater can copy with a button */}
                    <div>
                        <button>Join</button>
                        <button onClick={() => setOpenDialog(false)}>Close</button>
                    </div>
                </div>
            }
        <button onClick={() => setOpenDialog(true)} className={styles.interface_room_buttons}>
        Create Room
        </button>
    </div>
  )
}

export default CreateRoom