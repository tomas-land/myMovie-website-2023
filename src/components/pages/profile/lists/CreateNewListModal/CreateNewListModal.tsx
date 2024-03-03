"use client"
import { useModalContext } from "@/context/ModalContext";
import s from './create_list_modal.module.scss'

const CreateNewListModal = () => {
    const { openModal, closeModal, isModalOpened } = useModalContext();

    return (
        <div className={`${s.modal_overlay} ${isModalOpened ? s.show : s.hide}`} onClick={closeModal}>
            <div className={s.modal}>
                <div className={s.modal_header}>
                    <h2 className={s.modal_title}>Create new list</h2>
                    <span className={s.close_btn} onClick={closeModal}>&times;</span>
                </div>
                <div className={s.modal_content}>
                    {/* <div className={s.input_group}>
                        <input type="text" name="" id="" />
                    </div> */}
                    in development ...
                </div>
            </div>
        </div>
    );
}

export default CreateNewListModal