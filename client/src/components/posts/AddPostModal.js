import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';

import { PostContext } from '../../contexts/PostContext';

function AddPostModal() {
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const handleChangeNewPostForm = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };

    const closeDialog = () => {
        resetAddPostData();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };

    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
    };

    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={(event) => handleChangeNewPostForm(event)}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={(event) => handleChangeNewPostForm(event)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Tutorial URL"
                            name="url"
                            value={url}
                            onChange={(event) => handleChangeNewPostForm(event)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeDialog()}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddPostModal;
