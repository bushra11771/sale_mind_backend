exports.createTerminal = (req, res) => {
  res.json({ message: 'Terminal created successfully' });
};

exports.getAllTerminals = (req, res) => {
  res.json({ message: 'All terminals returned' });
};
