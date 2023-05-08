const generateReport = require('./report');
const Ticket = require('../../models/tickets/ticketModel');

describe('generateReport', () => {
  it('should calculate the correct report for a given date', async () => {
    // Create some test tickets with different dates
    const ticket1 = new Ticket({ items: [{ price: 10 }] });
    ticket1.createdAt = new Date('2022-01-01T10:00:00');
    await ticket1.save();

    const ticket2 = new Ticket({ items: [{ price: 5 }, { price: 7 }] });
    ticket2.createdAt = new Date('2022-01-02T14:00:00');
    await ticket2.save();

    const ticket3 = new Ticket({ items: [{ price: 2 }, { price: 3 }, { price: 4 }] });
    ticket3.createdAt = new Date('2022-01-03T18:00:00');
    await ticket3.save();

    // Generate report for January 2nd, 2022
    const report = await generateReport(new Date('2022-01-02'));

    // Check that the report contains the correct data
    expect(report.date).toEqual(new Date('2022-01-02'));
    expect(report.totalAmount).toEqual(12);
    expect(report.totalItems).toEqual(3);
  });
});
