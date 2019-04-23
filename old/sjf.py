from functools import reduce

processes = [[int(v) if v.isnumeric() else v for v in p.split(',')] + [0, 0]
            for p in open('processes', 'r').read().split('\n')]

# Sort by arrival time
processes.sort(key=lambda p: p[2])
for process in processes:
    process[4] = process[1] + process[2]

gantt = [[], []]

i = 0
while any([p[1] for p in processes]):
    gantt[0].append(str(i))
    for process in processes:
        if process[1] == 0:
            continue
        
        if process[2] == 0:
            if min([p[1] for p in filter(lambda x: x[2] == 0 and x[1], processes)]) == process[1]:
                process[1] -= 1
                gantt[1].append(str(process[0]))
            else:
                process[3] += 1
        
        if process[2] > 0:
            process[2] -= 1
    i += 1
gantt[0].append(str(i))
with open('output.csv', 'w') as f:
    f.write('Proceso,Tiempo de espera,Tiempo de entrega\n')
    for process in processes:
        process[4] += process[3]
        f.write('{0},{3},{4}\n'.format(*process))
    f.write('Diagrama de gantt\n')
    f.write(','.join(gantt[0]) + '\n')
    f.write(','.join(gantt[1]) + '\n')