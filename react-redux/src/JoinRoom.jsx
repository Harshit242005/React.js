import React, { useState } from 'react'
import styles from './Styles/InterfaceButtons.module.css';
function JoinRoom() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div>
            {openDialog &&
                <div>
                    <input type="text" placeholder='Type room id...' />
                    <div>
                        <button>Join</button>
                        <button onClick={() => setOpenDialog(false)}>Close</button>
                    </div>
                </div>
            }
            <button onClick={() => setOpenDialog(true)} className={styles.interface_room_buttons}>
                Join Room
            </button>
        </div>
    )
}

export default JoinRoom