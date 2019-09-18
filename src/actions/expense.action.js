import { expenseConstants } from '../constants';
import { expenseService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';

export const expenseAction = { 
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        expenseService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: expenseConstants.GETALL_REQUEST } }
    function success(users) { return { type: expenseConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: expenseConstants.GETALL_FAILURE, error } }
}