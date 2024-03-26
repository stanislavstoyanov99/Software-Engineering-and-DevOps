import { server } from './server.js';
import request from 'supertest';
import * as chai from 'chai';

const expect = chai.expect;

describe('Books API', () => {
    it('should POST a book', async () => {
        const book = { id: "1", title: "Test Book", author: "Test Author" };

        const res = await request(server)
            .post('/books')
            .send(book);

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('author');
    });

    it('should GET all books', async () => {
        const res = await request(server)
            .get('/books');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
    });

    it('should GET a single book', async () => {
        const bookId = 1;
        const res = await request(server)
            .get(`/books/${bookId}`);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('author');
    });

    it('should PUT an existing book', async () => {
        const bookId = 1;
        const updatedBook = { id: bookId, title: "Updated Test Book", author: "Updated Test Author" };

        const res = await request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.title).to.equal('Updated Test Book');
        expect(res.body.author).to.equal('Updated Test Author');
    });

    it('should DELETE an existing book', async () => {
        const book = { id: "1", title: "Test Book", author: "Test Author" };

        await request(server)
            .post('/books')
            .send(book);

        const res = await request(server)
            .delete(`/books/${book.id}`);
        
        expect(res.status).to.equal(204);
    });

    it('should return 404 when trying to GET, PUT or DELETE a non-existing book', async () => {
        const getRes = await request(server)
            .get('/books/9999');
        expect(getRes.status).to.equal(404);

        const putRes = await request(server)
            .put('/books/9999')
            .send({ id: "9999", title: "Non-existing Book", author: "Non-existing Author"});
        expect(putRes.status).to.equal(404);

        const deleteRes = await request(server)
            .delete('/books/9999');
        expect(deleteRes.status).to.equal(404);
    });
});

