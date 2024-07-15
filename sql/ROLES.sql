INSERT INTO role(createdat, createdby, name, description) VALUES
	(current_timestamp, 1, 'Analista', 'Usuario de análisis' ),
    (current_timestamp, 1, 'Médico', 'Usuario médico' ),
    (current_timestamp, 1, 'Enfermería', 'Usuario de enfermería' );

INSERT INTO permission(createdat, createdby, c, r, u, d, roleid, moduleid) VALUES
	(current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Analista'), (SELECT id FROM module WHERE name='patients')),
    (current_timestamp, 1, false, true, false, false, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='patients')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='antecedents')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='diagnostics')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='medicalexams')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='medicalrecords')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Médico'), (SELECT id FROM module WHERE name='vitalsigns')),
    (current_timestamp, 1, false, true, false, false, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='patients')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='antecedents')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='diagnostics')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='medicalexams')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='medicalrecords')),
    (current_timestamp, 1, true, true, true, true, (SELECT id FROM role WHERE name='Enfermería'), (SELECT id FROM module WHERE name='vitalsigns'));
